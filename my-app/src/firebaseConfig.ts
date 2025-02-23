import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkDiAg5uxuTc-SDW5OTdtpqxIv7Y5BB-8",
  authDomain: "tenantapp-eef31.firebaseapp.com",
  projectId: "tenantapp-eef31",
  storageBucket: "tenantapp-eef31.firebasestorage.app",
  messagingSenderId: "310008230190",
  appId: "1:310008230190:web:0a45eaa0f0f25dcedf8abf",
  measurementId: "G-6LXLHQZ5GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app);    // Firebase Auth instance

export { db, auth };
