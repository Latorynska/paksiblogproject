import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {

  apiKey: "",

  authDomain: "",

  projectId: "",

  storageBucket: "",

  messagingSenderId: "",

  appId: ""

};

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;