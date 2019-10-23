import React from 'react'
import { StyleSheet, Platform, Image, Text,View, Button , AsyncStorage} from 'react-native'
import { WebView } from 'react-native';
import Firebase from '../common/constants';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        errorMessage: null,
        userName :'',
    }
  }


  /*
  _fetchData = async () => {
    this.getToken();
  }
  */

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
          Mindfulness
        </Text>
        <View  style={{height:'60%',width:'80%'}}>
        <WebView
        source={{ uri: 'https://youtu.be/6p_yaNFSYao' }}
        style={{ marginTop: 20 }}
        scalesPageToFit={true}
               startInLoadingState={true}
                    javaScriptEnabled={true}

                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    mixedContentMode='always'
      />
        </View>
        
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  WebViewContainer: {
 
    marginTop: 20,
    backgroundColor: '#ecf0f1'
  }
})
