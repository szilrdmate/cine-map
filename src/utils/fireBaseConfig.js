// src/utils/firebaseConfig.js
import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cinemap-c958c.firebaseapp.com",
  projectId: "cinemap-c958c",
  storageBucket: "cinemap-c958c.appspot.com",
  messagingSenderId: "930485608135",
  appId: "1:930485608135:web:b4b2b5bf3e577e0edce8e2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;