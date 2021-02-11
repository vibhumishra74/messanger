import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //fire base credential
});

const db = firebaseApp.firestore();

export default db;
