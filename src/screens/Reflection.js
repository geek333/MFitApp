import React from 'react'
import { Alert,StyleSheet, Text, TextInput, View, Button , AsyncStorage,Image } from 'react-native'
import Firebase from '../common/constants';


export default class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        email: '',
        password: '', 
        errorMessage: null
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

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year ,
      time :+ hours + ':' + min + ':' + sec
    });
  }

  

  render() {
    return (

        <View style={{
    flex: 1,
    }}>

    <View>
        <Text style={{color:'#000000', fontSize: 24}}>
          Reflection
        </Text> 
         <Text style={{color:'#000000', fontSize: 18}}>
          How are you ??
        </Text> 
     </View>
      <View style={{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center', //changed value of alignItems
   }}>
         <Image
          style={{width: 25, height: 25}}
          source={require('../images/planner.png')}
        />
            <Text>{ this.state.date}</Text>
        
        <Image
          style={{width: 25, height: 25}}
          source={require('../images/clock.png')}
       />
            <Text>{this.state.time}</Text>
       
        
     </View>

      <View style={{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center', //changed value of alignItems
   }}>
        <Image
          style={{width: 90, height: 90}}
          source={require('../images/bad.jpg')}
        />
         <Image
          style={{width: 90, height: 90}}
          source={require('../images/ok.jpg')}
        />
         <Image
          style={{width: 90, height: 90}}
          source={require('../images/good.jpg')}
        />
         <Image
          style={{width: 90, height: 90}}
          source={require('../images/great.jpg')}
        />
      </View>

      </View>
    )
  }
}
