import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //firebase hosting
  //credential
  //herokuapp hosting Mern
});

const db = firebaseApp.firestore();

export default db;
