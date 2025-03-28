// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWkF6NvdX1FYZmKAoRLV1HRcrho-Zfqcc",
  authDomain: "netflixgpt-3b16c.firebaseapp.com",
  projectId: "netflixgpt-3b16c",
  storageBucket: "netflixgpt-3b16c.firebasestorage.app",
  messagingSenderId: "825326985383",
  appId: "1:825326985383:web:d5bf44e4d78255ac647b82",
  measurementId: "G-FB6QGBJY6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();