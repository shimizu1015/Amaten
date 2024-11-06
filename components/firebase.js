// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_HWtqS4lCES-0TT_06oBMtQpgImSYBYs",
  authDomain: "amaten-6bd8c.firebaseapp.com",
  projectId: "amaten-6bd8c",
  storageBucket: "amaten-6bd8c.appspot.com",
  messagingSenderId: "150807895464",
  appId: "1:150807895464:web:567031b2b2708fb716519d",
  measurementId: "G-DRHL6WLYEQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
