import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzXlfyw1JHdxNr_G5txPpaMDG3ZrKCJpA",
  authDomain: "reacttutorial-56e25.firebaseapp.com",
  databaseURL: "https://reacttutorial-56e25-default-rtdb.firebaseio.com",
  projectId: "reacttutorial-56e25",
  storageBucket: "reacttutorial-56e25.appspot.com",
  messagingSenderId: "922657941667",
  appId: "1:922657941667:web:2dfcb2db64d25a8b583716",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const store = fire.firestore();

export { store };
