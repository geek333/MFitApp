import React from 'react';
import { StyleSheet, Text,Button,View, StatusBar, ListView, AsyncStorage  } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Label, Icon, Footer } from 'native-base'
import Firebase from '../common/constants'
import { ScrollView } from 'react-native-gesture-handler';



var data = []

export default class WelcomeValues extends React.Component {

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



  componentDidMount() {
    let requestData = this.props.navigation.state.params.data
    let newData = []
   for (let userObject of requestData) {
     userValues = userObject.label;
     console.log(userValues)
     
     if (userValues.includes("Family"))
     { 
           console.log("Freedom")  
           newData.push("Freedom");
     }
     else if (userValues.includes("Achivement"))
     { 
           console.log("Fun")
           newData.push("Fun");  
     }
     else if (userValues.includes("Choices"))
     { 
           console.log("Power")
           newData.push("Power");
     }
     else if (userValues.includes("Play"))
     { 
           console.log("Love & Belonging") 
           newData.push("Love & Belonging");
     }
     else if (userValues.includes("Safety"))
     { 
           console.log("Survival")
           newData.push("Survival");
     }

 }

 console.log(newData)

 this.setState({listViewData : newData})
  }


  render() {
    return (
      <View style={styles.container}>
     
          <View>
            <Text style={{fontSize:32,color :'#333333', textAlign : "center"}}>Your Values</Text>
          </View>
          <View>
            <Text style = {styles.subheaders}>Results</Text>
          </View>
          <View style={{height: 300}}>
          <ScrollView  style={{marginTop:25 , marginBottom:25 , }}>
         {this.state.listViewData.map((item, key) => (
           //key is the index of the array
           //item is the single item of the array
           <View key={key} style = {styles.item} >
             <Text style = {styles.textData}>{item}</Text>
           
           </View>
         ))}
         </ScrollView>

          </View>

        <View style={{width:'100%',alignItems:"center",}}>
         <Button style={{color : '#e93766', marginBottom : 40 ,alignItems : "center"}} title="Next" onPress={()=>this.props.navigation.navigate('WelcomeResults',{data: this.state.listViewData, })}/>
             
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