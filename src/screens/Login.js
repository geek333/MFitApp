import React from 'react'
import { Alert,StyleSheet, Text, TextInput, View, Button , AsyncStorage,Image } from 'react-native'
import styles from './style';
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

 

  async storeToken(access_Token)
  {
    try{
         AsyncStorage.setItem("SessionId",access_Token);
    }
    catch(error)
    {
      console.log(error.message);
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


   handleLogin = () => {

    const { email, password } = this.state;
  
      
        Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
         
          let data1=data.user.uid;
          console.log("User ID :- ", data.user.uid);
          this.storeToken(data1);
          this.getToken();
          
         
          this.props.navigation.navigate('Loading')
        })
        .catch(error => Alert.alert("Login",error.message))
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 320, height: 250}}
          source={require('../images/logo_3.jpg')}
        />
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
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
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
 
        <Button title="Login" color="#e93766" onPress={this.handleLogin}/>
        <View>
        <Text>Don't have an account?<Text onPress={()=>this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}>Sign Up</Text></Text>
        </View>
      </View>
    )
  }
}