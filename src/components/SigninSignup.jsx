import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";
import { loginAPI } from "../services/UsersService"; // Gọi API backend
import styles from "./SigninSignup.module.css";

const SigninSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const [isLogin, setIsLogin] = useState(mode === "signin");

  useEffect(() => {
    setIsLogin(mode === "signin");
  }, [mode]);

  // Xử lý đăng nhập với Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      if (user) {
        const idToken = await user.getIdToken(); // Lấy idToken từ Firebase
        console.log("Google ID Token:", idToken);
  
        // Gửi idToken lên backend để xác thực
        const response = await loginAPI(idToken);
  
        // Lưu token và role từ backend vào localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("role", response.role); // Lưu role để sử dụng sau
        
        // Also store the user's email for later use
        localStorage.setItem("userEmail", user.email);
        
        if ((response.role !== 'Admin' && response.role !== 'Staff')) {
          alert(`You do not have permission to access this feature!`);
        } else {
          alert(`Welcome, ${user.displayName || user.email}!`);
        }
        
        // ✅ Điều hướng dựa trên role
        if (response.role === "Admin" || response.role === "Staff") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
      alert("Error! Please try again.");
    }
  };
  
  return (
    <div className={styles["auth-container"]} data-aos="zoom-out-down">
      <div className={styles["auth-box"]}>
        <div className={styles["auth-header"]}>
          <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p>{isLogin ? "Sign in to continue" : "Get started with your account"}</p>
        </div>

        <form className={styles["auth-form"]}>
          <button type="button" className={styles["submit-btn"]} onClick={handleGoogleSignIn}>
            <div className={styles["google-icon"]} />
            Continue with Google
          </button>
        </form>

        <div className={styles["auth-footer"]}>
          <p>Continuing means you agree to our Terms of Use</p>
        </div>
      </div>
    </div>
  );
};

export default SigninSignup;