import React from 'react'
import { StyleSheet, Platform, Image, Text,View, Button } from 'react-native'
import { WebView } from 'react-native';

export default class Welcome extends React.Component {
  state = { currentUser: null }
render() {
    const { currentUser } = this.state
return (
      <View style={styles.container}>
      <Text style={{color:'#000000', fontSize: 40}}>
          Welcome to
        </Text>

        <Text style={{color:'#000000', fontSize: 40}}>
          Mentally Fit EP
        </Text>
        <View  style={{height:'60%',width:'80%'}}>
        <WebView
        source={{ uri: 'https://youtu.be/Pb4N6oZCD9o' }}
        style={{ marginTop: 20 }}
        scalesPageToFit={true}
               startInLoadingState={true}
                    javaScriptEnabled={true}

                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    mixedContentMode='always'
      />
        </View>
        <Button title="Next" color="#e93766"/>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
