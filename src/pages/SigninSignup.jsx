import React from 'react';
import SignupSignin from '../components/SigninSignup';
import landingclasses from './Landing.module.css';
import Navigation from '../components/Navigation';

const SigninSignup = () => {
  return (
    <div className={landingclasses.landing}>
      <Navigation />
      <SignupSignin />
    </div>
  );
};

export default SigninSignup;
