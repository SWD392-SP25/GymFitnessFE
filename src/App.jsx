import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import SigninSignup from './pages/SigninSignup';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/landing" element={<Landing />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-in-sign-up" element={<SigninSignup />} />
      </Routes>
    </>
  );
}

export default App;
