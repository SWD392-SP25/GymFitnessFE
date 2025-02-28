// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Cấu hình Firebase mới
const firebaseConfig = {
  apiKey: "AIzaSyBAbBufdzs-vqaZ8HEeLCNmfJgLRK3lPN8",
  authDomain: "gymbot-3ddf3.firebaseapp.com",
  databaseURL: "https://gymbot-3ddf3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gymbot-3ddf3",
  storageBucket: "gymbot-3ddf3.firebasestorage.app",
  messagingSenderId: "786640143654",
  appId: "1:786640143654:web:928a7825a232d9bf9fade7",
  measurementId: "G-0STFJVVL4S"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app); // Bổ sung Analytics nếu cần

export { auth, googleProvider, signInWithPopup, analytics };
