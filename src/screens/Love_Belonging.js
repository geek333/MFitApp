import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView,AsyncStorage } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, Footer } from 'native-base'
import Firebase from '../common/constants'
import { ScrollView } from 'react-native-gesture-handler';



var data = []

export default class LoveBelonging extends React.Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newItem: "",
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

   getItem()
  { 
    try{
        var that = this
        
        Firebase.database().ref('Users/'+this.state.myKey+'/loveBelonging').on('child_added', function (data) {
            var newData = [...that.state.listViewData]
            newData.push(data.val().name)
            that.setState({ listViewData: newData })
    })
  }catch(error)
    {
        console.log(error)
    }

  }

  componentDidMount() {
    console.log("called");
    this.getToken();
    this.getItem();
    
  }

  addRow(data) {
    console.log('Users/'+this.state.myKey+'/loveBelonging');
    var key = Firebase.database().ref('Users/'+this.state.myKey+'/loveBelonging').push().key
    Firebase.database().ref('Users/'+this.state.myKey+'/loveBelonging').child(key).set({ name: data })
    this.getItem()
  }

  async deleteRow(secId, rowId, rowMap, data) {

    await Firebase.database().ref('Users/'+this.state.myKey+'/loveBelonging' + data.key).set(null)

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
        

        <Content>
          <View>
            <Text style={{fontSize:32,color :'#333333', textAlign : "center"}}>Love & Belonging</Text>
          </View>
          <View>
            <Text style = {styles.subheaders}>You like your independenceand control over what you're doing</Text>
          </View>
          <View>
            <Text style = {styles.subheaders}>Write down what you like doing that makes you feel free</Text>
          </View>
         <ScrollView  style={{marginTop:25}}>
         {this.state.listViewData.map((item, key) => (
           //key is the index of the array
           //item is the single item of the array
           <View key={key} style = {styles.item} >
             <Text style = {styles.textData}>{item}</Text>
           
           </View>
         ))}
         </ScrollView>
        </Content>

        <Footer style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              <Input
                style = {styles.textBox}
                onChangeText={(newContact) => this.setState({ newContact })}
                placeholder="Power "
              />
              <Button onPress={() => this.addRow(this.state.newContact)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#262626',
      
   },
   textData: {
      color: '#ffffff',
   },
   textBox: {
      color: '#ffffff',
   },
   subheaders: {
      color: '#333333',
      textAlign : "center",
      fontSize : 12,
      paddingTop:3,
      paddingBottom:3

   }
});