import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView,AsyncStorage,Button, } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Icon, Footer } from 'native-base'
import Firebase from '../common/constants'
import { ScrollView } from 'react-native-gesture-handler';



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

   getItem()
  { 
    try{
        var that = this
        
        Firebase.database().ref('Users/'+this.state.myKey+'/reflection').on('child_added', function (data) {
            var newData = [...that.state.listViewData]
            var userRowData=data.val().Date+"   "+data.val().Time+" \n Feeling :  "+data.val().Mood+" \n Reason : "+data.val().Text
            newData.push(userRowData)
            that.setState({ listViewData: newData })
    })
  }catch(error)
    {
        console.log(error)
    }

  }

  componentDidMount() {
    
    this.getToken();
    this.getItem();
  }


  async deleteRow(secId, rowId, rowMap, data) {

    await Firebase.database().ref('Users/'+this.state.myKey+'/reflection' + data.key).set(null)

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
            <Text style={{fontSize:32,color :'#333333', textAlign : "center"}}>Reflection</Text>
          </View>
          <View>
            <Text style = {styles.subheaders}>Activities </Text>
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
        <View>
            
            <Button onPress={()=>this.getItem()} style={{color:'#005ce6', fontSize: 18 ,textAlign: "center",marginBottom:15}} title="Refresh List"/>
            <Button onPress={()=>this.props.navigation.navigate('Home')} style={{ paddingLeft:15}} title="Home"/>
            
        </View>

       
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