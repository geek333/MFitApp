
import firebase from 'firebase';


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


// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase