// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt_cMfMzjXTMUeqKyXtVV0JgrC229HvvM",
  authDomain: "ghostpayai.firebaseapp.com",
  projectId: "ghostpayai",
  storageBucket: "ghostpayai.firebasestorage.app",
  messagingSenderId: "352478518591",
  appId: "1:352478518591:web:599651eef1f09636be478a",
  measurementId: "G-1M6GCVK2NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);