import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native'
import styles from './style'
import * as firebase from 'firebase';

export default class signUp extends React.Component {npm 
  state = { email: '', password: '',name:'', errorMessage: null }

  handleSignUp = () => {

    data = async () => {
        const { name, password, email } = this.state;
    }

    const firebaseConfig = {
        apiKey: "AIzaSyC7Xn9kxFAd-0qFRoRbuczWVPVgYd_AadM",
        authDomain: "mfitapp-7f639.firebaseapp.com",
        databaseURL: "https://mfitapp-7f639.firebaseio.com",
        projectId: "mfitapp-7f639",
        storageBucket: "mfitapp-7f639.appspot.com",
        messagingSenderId: "940699961246",
        appId: "1:940699961246:web:9ba602fb588625817cf88f",
        measurementId: "G-GE1TQTVV4Y"
      };
    
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('users').push(
        {
            username : '',
            emailId : '',
            upwd : ''
        }
    ).then(()=>{
        
    }).catch((error)=>{
        console.log(error);
    })
   
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
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChange={email=>this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChange={name=>this.setState({name})}
          value={this.state.name}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChange={password=>this.setState({password})}
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