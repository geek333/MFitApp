import React from 'react';
import { StyleSheet,Button, Text, View, StatusBar, ListView,AsyncStorage, } from 'react-native';
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
      <View style={styles.container}>
        

        
            <View>
              <Text style={{fontSize:32,color :'#333333', textAlign : "center"}}>Reflection</Text>
            </View>

            <View>
              <Text style = {styles.subheaders}>Activities </Text>
            </View>
            <View>
                <ScrollView  style={{marginTop:25 , height : 400}}>
                {this.state.listViewData.map((item, key) => (
                  //key is the index of the array
                  //item is the single item of the array
                  <View key={key} style = {styles.item} >
                    <Text style = {styles.textData}>{item}</Text>
                  
                  </View>
                ))}
                 </ScrollView>
        </View>
        <View style={{width:'100%'}}>
            
            <Button  style={{color:'#005ce6', width :'40%'}} title="Refresh List" onPress={()=>this.getItem()}/>
            <Button  style={{ color:'#005ce6', width :'40%'}} title="Home" onPress={()=>this.props.navigation.navigate(' Go To Home')}/>
            
        </View>

       
      </View>
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