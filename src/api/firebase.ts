// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjWiJ1iH7k0Sxc8fUODXBbm6hROxNEll8",
  authDomain: "hi-story-38c4c.firebaseapp.com",
  projectId: "hi-story-38c4c",
  storageBucket: "hi-story-38c4c.appspot.com",
  messagingSenderId: "639551200213",
  appId: "1:639551200213:web:cd06170c356d956e967b5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
