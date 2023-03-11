// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABVQSn6mdXdVtgHXf76nXCck94Kf6TJb8",
  authDomain: "georeact-a997f.firebaseapp.com",
  projectId: "georeact-a997f",
  storageBucket: "georeact-a997f.appspot.com",
  messagingSenderId: "419430608505",
  appId: "1:419430608505:web:913263a392c9d42bc62ea8",
  measurementId: "G-BSG64VD3W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
