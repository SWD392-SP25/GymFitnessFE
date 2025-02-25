import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import landingclasses from '../pages/Landing.module.css';
import styles from "./SigninSignup.module.css";

const SigninSignup = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');

  const [isLogin, setIsLogin] = useState(mode === 'signin');

  useEffect(() => {
    setIsLogin(mode === 'signin');
  }, [mode]);



  return (
    <div className={styles['auth-container']} data-aos='zoom-out-down'>
      <div className={styles["auth-box"]}>
        <div className={styles["auth-header"]}>
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLogin ? 'Sign in to continue' : 'Get started with your account'}</p>
        </div>

        <form className={styles["auth-form"]}>
          <button type="submit" className={styles["submit-btn"]}>
            <div className={styles["google-icon"]} />
            Continue with Google
          </button>
        </form>


        <div className={styles["auth-footer"]}>
          <p>
            Continuing means you agree to our Terms of Use
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninSignup;