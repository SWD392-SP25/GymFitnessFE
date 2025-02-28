import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig"; // Import Firebase
import styles from "./SigninSignup.module.css";

const SigninSignup = () => {
  const location = useLocation();
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

      console.log("User:", user);
      alert(`Welcome, ${user.displayName}!`);
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
