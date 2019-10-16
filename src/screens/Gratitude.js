import React from 'react';
import { Button, Image, View, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

export default class Gratitude extends React.Component {

state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:'#000000', fontSize: 24}}>
          What am I grateful for?
        </Text>   
        <Text style={{color:'#000000', fontSize: 24}}>
          Photos
        </Text>    
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Image source={require('../images/logo.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/logo.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/logo.png')} style={{width:70, height:70}}/>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Image source={require('../images/logo.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/logo.png')} style={{width:70, height:70}}/>
        <Image source={require('../images/logo.png')} style={{width:70, height:70}}/>
        </View>

        
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
    console.log(ref.getDownloadURL());
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

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.uploadImage(result.uri, 'test-image')
        .then(() => {
          Alert.alert("Image uploaded successfully!!");
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
    }
  };
