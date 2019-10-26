import React from 'react'
import { Alert,StyleSheet, Text, TextInput, View, AsyncStorage,Image ,Button, } from 'react-native'
import Firebase from '../common/constants';
import Textarea from 'react-native-textarea';

var data=[]

export default class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        email: '',
        text: '',
        errorMessage: null,
        mood: '',
        date: '' ,
        time: '',
        selectMenu: data,
    }
  }

  async getToken()
  {
    try{
     //let key= await AsyncStorage.getItem("SessionId");
     const value = await AsyncStorage.getItem("SessionId");
     this.setState({myKey: value});
      }
    catch(error)
    {
      console.log(error.message);
    }
  }

  
  addRow(data) {

    let requestData = this.props.navigation.state.params.data
    
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    let mood = requestData
    let dateData = date + '/' + month + '/' + year ;
    let time = hours + ':' + min + ':' + sec
    let selection = "test"

    console.log('Users/'+this.state.myKey+'/reflection');
    var key = Firebase.database().ref('Users/'+this.state.myKey+'/reflection').push().key
    Firebase.database().ref('Users/'+this.state.myKey+'/reflection').child(key).set({ Mood : mood , Date : dateData , Time : time , Selection : selection , Text : data})
    
  }

  componentDidMount() {

    this.getToken();
  }

  

  render() {
    return (

        <View style={styles.container} >

            <View style={{justifyContent : 'center', marginTop :15}}>
                <Text style={{color:'#000000', fontSize: 24, flexDirection:'column' , textAlign : "center",}}>
                Reflection
                </Text> 
                <Text style={{color:'#000000', fontSize: 18 , flexDirection:'column',  textAlign : "center",marginTop :55}}>
                What are you upto ??
                </Text> 

                <TextInput
                    style = {styles.textarea}
                    onChangeText={(text) => this.setState({ text })}
                    placeholder="how do you feel "
                />
                <Button onPress={() => this.addRow(this.state.text)} title ="Add"/>
            </View>
      
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'bottom',  // hack android
      width : 320,
      fontSize: 14,
      color: '#333',
      borderColor:'#000000',
      borderWidth :1,
      marginBottom: 10
    },
  });