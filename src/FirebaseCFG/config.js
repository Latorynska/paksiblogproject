import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {

  apiKey: "AIzaSyCFDWJBM3Z-iOltHhaG--NVADSDrEQvTPU",

  authDomain: "paksi-ringkang.firebaseapp.com",

  projectId: "paksi-ringkang",

  storageBucket: "paksi-ringkang.appspot.com",

  messagingSenderId: "939168441804",

  appId: "1:939168441804:web:f07c82805ddef329be6969"

};

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;