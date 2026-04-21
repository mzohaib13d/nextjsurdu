// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAzvREWlTRKzhgszFTxMIP1ZcACWODN2U",
  authDomain: "nextjsurdu.firebaseapp.com",
  projectId: "nextjsurdu",
  storageBucket: "nextjsurdu.firebasestorage.app",
  messagingSenderId: "7028551022",
  appId: "1:7028551022:web:203b3e6a8e8ce16087e57f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);