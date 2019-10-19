import React from 'react';
import { Button, Image, View, Alert, Text, ListView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
require("json-circular-stringify");

export default class Gratitude extends React.Component {

state = {
    image: null,
    testurl: null,
  };

  render() {
    let { image } = this.state;
    let { testurl } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:'#000000', fontSize: 24}}>
          What am I grateful for?
        </Text>   
        <Text style={{color:'#000000', fontSize: 24}}>
          Photos
        </Text>    
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        
         
        <Image source={{uri: testurl}} style={{width:70, height:70}}/>
        <Image source={require('../images/drawer.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/drawer.png')} style={{width:70, height:70}}/>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Image source={require('../images/drawer.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/drawer.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/drawer.png')} style={{width:70, height:70}}/>
        </View>

        <Image source={require('../images/drawer.png')} style={{width:40, height:40, justifyContent: 'flex-end', alignItems:'flex-end'}} 
          onPress={this._pickImage}/>
         <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{uri: image}} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.showimage();
  }

  uploadImage = async (uri, imageName) => {

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
    
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    // console.log(ref.getDownloadURL());
    return ref.put(blob);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }



  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

     console.log(result);
     var filename = result.uri.replace(/^.*[\\\/]/, '');
     console.log(filename)

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.uploadImage(result.uri, filename)
        .then(() => {
          Alert.alert("Image uploaded successfully!!");
          // console.log(this.state.url);
          this.showimage();
          // console.log(this.state.url);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
    }
  
    displayImage(imageRef) {
  imageRef.getDownloadURL().then((url) => {
    // TODO: Display the image on the UI
    console.log(url)
  });
}

  showimage = async () => {
    console.log("show image called")
    let ref = firebase.storage().ref('/images');
    const results = await ref.listAll()
    // this.setState({testurl: url});
    //const data = JSON.stringify(results)
    console.log(results.items.location.val().path_)
     

    
  
   .then((url) => {
    //this.state({testurl.push(url)})
    
       // this.setState({testurl: url});
       //console.log(url);
   });
  }

  };

  // this.showimage();

// function showimage() {

//          var storageRef = firebase.storage().ref();
//          var spaceRef = storageRef.child('images/test-image');
//          storageRef.child('images/test-image').getDownloadURL().then(function(url) {
//              var test = url;
//              console.log(test);
//              Alert.alert(url);
//              this.setState({url: url});

//          }).catch(function(error) {
//               Alert.alert(error.message);
//          });

//      }
