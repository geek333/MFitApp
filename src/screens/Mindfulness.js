import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import styles from './style'
import {Video} from 'expo-av'
export default class Mindfullness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        errorMessage: null,
        userName :'',
    }
  }

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
       }
     catch(error)
     {
       console.log(error.message);
     }
  }
render() {
    
return (
      
      <View style={styles.container}>
      <Text style={{color:'#000000', fontSize: 30}}>
          Welcome to 
        </Text>

        <Text style={{color:'#000000', fontSize: 30}}>
          Mentally Fit EP - { }
        </Text>
        <View  style={{height:'60%',width:'80%'}}>
        <WebView
        source={{ uri: 'https://youtu.be/wnHW6o8WMas' }}
        style={{ marginTop: 20 }}
        scalesPageToFit={true}
               startInLoadingState={true}
                    javaScriptEnabled={true}

                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    mixedContentMode='always'
      />
        </View>
        <Button title="Next" onPress={()=>this.props.navigation.navigate('Welcome')} color="#e93766"/>
        </View>
    )
  }
}
