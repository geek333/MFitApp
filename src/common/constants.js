
import firebase from 'firebase';


const firebaseConfig = {
     apiKey: "AIzaSyDlEE81gw87MrdpJjWMVd4OBFM-wmq1bmw",
    authDomain: "mfit-22da1.firebaseapp.com",
    databaseURL: "https://mfit-22da1.firebaseio.com",
    projectId: "mfit-22da1",
    storageBucket: "mfit-22da1.appspot.com",
    messagingSenderId: "647289255987",
    appId: "1:647289255987:web:1f619170c32f0ef4ac8b46",
    measurementId: "G-98GCF1005V"
  };


// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase