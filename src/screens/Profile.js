import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,AsyncStorage,Alert  } from 'react-native'
import styles from './style'
import Firebase from '../common/constants'


export default class signUp extends React.Component {npm 
  state = { email: '',name:'',gender :'',dob:'',myKey : '', errorMessage: null }


  componentDidMount()
  {
        this.getToken();
  }

  async getToken()
  {
    try{
      //let key= await AsyncStorage.getItem("SessionId");
      const value = await AsyncStorage.getItem("SessionId");
      console.log(value);
      this.setState({myKey: value});
      Firebase.database().ref('Users/'+value).on("value",(data)=>
        {
            this.setState({email : data.val().email , gender : data.val().Gender , dob : data.val().dateOfBirth , name : data.val().uname })
        })
       }
     catch(error)
     {
       console.log(error.message);
     }
  }


 UpdateProfile = () => {

    emailId = this.state.email;
    name = this.state.name;
    gender = this.state.gender;
    dob = this.state.dob;
    myKey = this.state.myKey;

try{
    Firebase.database().ref("Users/"+myKey).update(
        {
            email : emailId ,
            uname : name,
            dateOfBirth : dob ,
            Gender : gender
          }
)
Alert.alert("Profile","Profile Updated Successfully ")
}catch(error){
    Alert.alert("Profile","Error Occured While updating")
}
      
}

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Profile</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Text
          style={styles.textInput}
          autoCapitalize="none"
        >{ this.state.email} </Text>
         <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
       <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Male/Female"
          onChangeText={gender => this.setState({ gender })}
          value={this.state.gender}
        />

        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="DD/MM/YYYY"
          onChangeText={dob => this.setState({ dob })}
          value={this.state.dob}
        />
        
        <Button title="Update Profile" color="#e93766" onPress={this.UpdateProfile}/>
        
      </View>
    )
  }
}