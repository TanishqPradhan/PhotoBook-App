// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOXMdCKgwTGQJJBZqWi1I-nMXMZ5f5rNg",
  authDomain: "my-photobook-329423.firebaseapp.com",
  projectId: "my-photobook-329423",
  storageBucket: "my-photobook-329423.appspot.com",
  messagingSenderId: "343349475308",
  appId: "1:343349475308:web:1e30450de3592bfdf732c9",
  measurementId: "G-MRL2P1718E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
