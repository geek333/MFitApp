import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native'
import styles from './style'
import Firebase from '../common/constants'


export default class signUp extends React.Component {npm 
  state = { email: '', password: '',name:'', errorMessage: null }

  handleSignUp = () => {

    emailId = this.state.email;
    pass = this.state.password;
    name = this.state.name;

    Firebase.auth()
    .createUserWithEmailAndPassword(emailId, pass)
    .then(data => {
      let userId=data.user.uid;
      console.log(userId);
      Firebase.database().ref('Users/'+userId).set({
        email : emailId,
        uname : name,
         }).then((data)=>{
                
                console.log('data ' , data)
            }).catch((error)=>{
                
                console.log('error ' , error)
            })
     
      this.props.navigation.navigate('Login')
    })
    .catch(error => console.log(error))  

  }

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
         <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
       <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp}/>
        <View>
            <Text>Already have an account ?<Text onPress={()=>this.props.navigation.navigate('Login')} style={{color:'#e93766', fontSize: 18}}>Login </Text></Text>
        </View>
      </View>
    )
  }
}