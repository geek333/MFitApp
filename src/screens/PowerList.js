import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView,AsyncStorage } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'
import Firebase from '../common/constants'



var data = []

export default class PowerList extends React.Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newContact: "",
      myKey: null,
      errorMessage: null,
      userName :'',
    }

  }


  async getToken()
  {
    try{
      //let key= await AsyncStorage.getItem("SessionId");
      const value = await AsyncStorage.getItem("SessionId");
      console.log(value);
      this.setState({myKey: value});
       }
     catch(error)
     {
       console.log(error.message);
     }
  }

  componentDidMount() {
    console.log("called");
    this.getToken();
    
    try{
        var that = this
        Firebase.database().ref('Users/'+this.state.myKey+'/power').on('child_added', function (data) {
    
            console.log("------------"+data);
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({ listViewData: newData })
      
          })
    }catch(error)
    {
        console.log(error)
    }
  }

  addRow(data) {
    console.log('Users/'+this.state.myKey+'/power');
    var key = Firebase.database().ref('Users/'+this.state.myKey+'/power').push().key
    Firebase.database().ref('Users/'+this.state.myKey+'/power').child(key).set({ name: data })
  }

  async deleteRow(secId, rowId, rowMap, data) {

    await Firebase.database().ref('Users/'+this.state.myKey+'/power' + data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  showInformation() {

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              <Input
                onChangeText={(newContact) => this.setState({ newContact })}
                placeholder="Power "
              />
              <Button onPress={() => this.addRow(this.state.newContact)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
            
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {data.val().name}</Text>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.addRow(data)} >
                <Icon name="information-circle" />
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name="trash" />
              </Button>

            }

            leftOpenValue={-75}
            rightOpenValue={-75}

          />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});