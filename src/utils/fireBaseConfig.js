// src/utils/fireBaseConfig.js

// TODO: add firbase to project + firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Corrected import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cinemap-c958c.firebaseapp.com",
  projectId: "cinemap-c958c",
  storageBucket: "cinemap-c958c.appspot.com",
  messagingSenderId: "930485608135",
  appId: "1:930485608135:web:b4b2b5bf3e577e0edce8e2",
  measurementId: "G-E70D6M11TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Corrected Firestore initialization


export default db;
