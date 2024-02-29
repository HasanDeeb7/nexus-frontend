// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEM8KRR_VpQISWdvwXPtz_RGlU6QqwAe4",
  authDomain: "nexus-7119.firebaseapp.com",
  projectId: "nexus-7119",
  storageBucket: "nexus-7119.appspot.com",
  messagingSenderId: "1084931206081",
  appId: "1:1084931206081:web:56257e12b685c5de259d40",
  measurementId: "G-8F8EMWWG30",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
