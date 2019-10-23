import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'


export default class MyValues extends React.Component {
 render() {
    return (
      <View style={styles.container}>
        
        <View>
        <Text  style={{ fontSize: 28 , textAlign : "center" , marginTop:15 , marginBottom : 15 }}>My Values</Text>
        </View>

         <View style={styles.item}>
          <Text onPress={()=>this.props.navigation.navigate('FreedomList')} style={{ fontSize: 20 }}> Freedom</Text>
          <Text style={{ fontSize: 12 }}> Activities</Text>
        </View>
       <View style={styles.item}>
        <Text onPress={()=>this.props.navigation.navigate('Fun')}  style={{ fontSize: 20 }}> Fun</Text>
        <Text style={{ fontSize: 12 }}> Activities</Text>
      </View>
      <View style={styles.item}>
        <Text onPress={()=>this.props.navigation.navigate('Survival')} style={{ fontSize: 20 }}> Survival</Text>
        <Text style={{ fontSize: 12 }}> Activities</Text>
      </View>
      <View style={styles.item}>
        <Text onPress={()=>this.props.navigation.navigate('Love')} style={{ fontSize: 20 }}> Love & Belongigng</Text>
        <Text style={{ fontSize: 12 }}> Activities</Text>
      </View>
      <View style={styles.item}>
        <Text onPress={()=>this.props.navigation.navigate('Power')} style={{ fontSize: 20 }}> Power</Text>
        <Text style={{ fontSize: 12 }}> Activities</Text>
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
      margin: 10, 
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
