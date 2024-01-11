// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDacyb8TZrC3N1FBNpMJR__-Z2jKYY351E",
  authDomain: "jobplug-1054e.firebaseapp.com",
  projectId: "jobplug-1054e",
  storageBucket: "jobplug-1054e.appspot.com",
  messagingSenderId: "310317222923",
  appId: "1:310317222923:web:825a7ebc94086258d6cb0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)