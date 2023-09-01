// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "opns-438c7.firebaseapp.com",
  projectId: "opns-438c7",
  storageBucket: "opns-438c7.appspot.com",
  messagingSenderId: "520668587092",
  appId: "1:520668587092:web:101809d67a978d5fb5f9c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);