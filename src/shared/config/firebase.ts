// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALlu3r2ZS-LC1ABrmxWbh4qx5iBwWCUOM",
  authDomain: "semlly-dev.firebaseapp.com",
  projectId: "semlly-dev",
  storageBucket: "semlly-dev.firebasestorage.app",
  messagingSenderId: "588727770856",
  appId: "1:588727770856:web:8e46ab748a8f94a47c335d",
  measurementId: "G-RE8ECPP0TN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
