import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView,AsyncStorage ,Button } from 'react-native';
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
    let count =0
   for (let userObject of requestData) {
     userValues = userObject;
    
     if(count<2)
     {

        if (userValues.includes("Freedom"))
        { 
              newData.push("Freedom - You love your independence and control over what you do.");
        }
        else if (userValues.includes("Fun"))
        { 
              newData.push("Fun - You belive life should be a celebration. you love to play and laugh.");  
        }
        else if (userValues.includes("Power"))
        { 
              newData.push("Power - You like to control the things around you and change the course of action");
        }
        else if (userValues.includes("Love & Belonging"))
        { 
              newData.push("Love & Belonging - You  feeling a person's happiness is very important to you, and the way you show this feeling in your behaviour towards them.");
        }
        else if (userValues.includes("Survival"))
        { 
              newData.push("Survival - You always rise up in difficult situations");
        }
   
     }
     
     count=count+1;
 }

 console.log(newData)

 this.setState({listViewData : newData})
  }


  render() {
    return (
      <View style={styles.container}>
        

        <View>
          <View>
            <Text style={{fontSize:32,color :'#333333', textAlign : "center"}}>Your Values</Text>
          </View>
          <View>
            <Text style = {styles.subheaders}>Top 2 Results</Text>
          </View>
         <ScrollView  style={{marginTop:25}}>
         {this.state.listViewData.map((item, key) => (
           //key is the index of the array
           //item is the single item of the array
           <View key={key} style = {styles.item} >
             <Text style = {styles.textData}>{item}</Text>
           
           </View>
         ))}
         </ScrollView>
        
         </View>
        <View style={{width:'100%',alignItems:"center",marginTop:40}}>
         <Button style={{color : '#e93766', marginBottom : 40 ,alignItems : "center"}} title="Go To Home" onPress={()=>this.props.navigation.navigate('Home')}/>
            
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