import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyD9lShBxm_BlLVmMMQhKNiuxnOSLNpX8vc",
  authDomain: "food-manager-bb596.firebaseapp.com",
  databaseURL: "https://food-manager-bb596.firebaseio.com",
  projectId: "food-manager-bb596",
  storageBucket: "food-manager-bb596.appspot.com",
  messagingSenderId: "199709354545",
  appId: "1:199709354545:web:ef844e27613e3ee9dc0310",
  measurementId: "G-LMRBFMRLRR"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;