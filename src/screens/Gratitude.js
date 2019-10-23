import React from 'react';
import { Button, Image, View, Alert, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
require("json-circular-stringify");

var data = []

export default class Gratitude extends React.Component {

state = {
    image: null,
    urls: data,
    firebasePath: null,
  };

  render() {
    let { image } = this.state;
    var imagePath = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:'#000000', fontSize: 24}}>
          What am I grateful for?
        </Text>   
        <Text style={{color:'#000000', fontSize: 24}}>
          Photos
        </Text>    

        <ScrollView style={{marginTop: 20}}
        horizontal= {true}
        decelerationRate={0}
        snapToAlignment={"center"}
        >
          {this.state.urls.map((item, key) => (
            //key is the index of the array 
            //item is the single item of the array
            <View key={key} >
              <Image
          style={{ width: 150, height: 150, alignItems: 'center', justifyContent: 'center', margin: 10}}
          source={this.getSource(item)}
        />
            </View>
          ))}
        </ScrollView>
        
        <Button style={{marginBottom: 40}}
          title="Share your happiness with us"
          onPress={this._pickImage}
        />
         
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    
    this.showimage() 
  }

  getSource(item) {
    console.log("..image path::"+item)

    return { uri: item};
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
          this.showimage();
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
    }

    showimage = async () => {
    console.log("show image called")
    let ref = firebase.storage().ref('/images');
    this.state.firebasePath = firebase.storage().ref()
    const results = await ref.listAll()
    // this.setState({testurl: url});
    const data = JSON.stringify(results)
    var that = this
    var url = []
    //console.log(data)
    
    var storageRef = firebase.storage().ref();
    for(i in results.items) {
      console.log(results.items[i].location.path_)
      var path = this.state.firebasePath + results.items[i].location.path_
      //this.getUrl(path)
      var spaceRef = await storageRef.child(results.items[i].location.path_);
         storageRef.child(results.items[i].location.path_).getDownloadURL().then(function(downloadUrl) {
             
             console.log("download::"+downloadUrl)
             url.push(downloadUrl)
              that.setState({urls: url})

         }).catch(function(error) {

         });
      
    }

    console.log("..."+that.state.urls)
  }


  };
