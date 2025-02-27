// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4MmAM_q-OpDoyXF4OgX9a6M73k934-gs",
  authDomain: "gymfitnessfe.firebaseapp.com",
  projectId: "gymfitnessfe",
  storageBucket: "gymfitnessfe.firebasestorage.app",
  messagingSenderId: "516691784482",
  appId: "1:516691784482:web:0139cc9a04cf80d6ae2b7b",
  measurementId: "G-YLYCP70SR8"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
