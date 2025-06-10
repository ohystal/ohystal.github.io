import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCPTHhZf-dvD6B0F0HTal5cQ9V0AX1K1CA",
  authDomain: "vue-board-44511.firebaseapp.com",
  projectId: "vue-board-44511",
  storageBucket: "vue-board-44511.firebasestorage.app",
  messagingSenderId: "645051287870",
  appId: "1:645051287870:web:d0ca716a6c59944fe0446f",
  measurementId: "G-4F8SY8B6G8"
};

export const db = getFirestore(firebase.initializeApp(firebaseConfig))
export const auth = getAuth(firebase.initializeApp(firebaseConfig));