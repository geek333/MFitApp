import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import styles from './style'
import call from 'react-native-phone-call'




export default class Crisis extends React.Component {
    CallHelpLine = () => {
        const args = {
            number: '000', // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
           
          call(args).catch(console.error)
      }
 render() {
    return (
      <View style={styles.MainContainer}>
        <View>
        <Text  style={{ fontSize: 28 }}>Crisis HelpLine Number</Text>
        </View>
       
        <Text style={{ fontSize: 18 }}>Conatct Us :</Text>
        <Text>     </Text>
        <Button title="000" color="#e93766" onPress={this.CallHelpLine}/>
        
      </View>
    );
  }
}
 
