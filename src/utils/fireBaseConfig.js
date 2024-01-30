
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD3usYRhzsaoXdWYj6cGh3509mvggVsPik",
  authDomain: "cinemap-c958c.firebaseapp.com",
  projectId: "cinemap-c958c",
  storageBucket: "cinemap-c958c.appspot.com",
  messagingSenderId: "930485608135",
  appId: "1:930485608135:web:35398cdcaed45b86dce8e2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);