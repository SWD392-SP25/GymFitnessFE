import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

// Import charts config
import './charts/ChartjsConfig';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';

// Import UI components
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Input from './components/ui/Input';

// Import modals
import ConfirmModal from './components/modals/ConfirmModal';
import FormModal from './components/modals/FormModal';

// Import pages
import Dashboard from './pages/Admin/Dashboard';
import Landing from './pages/Landing';
import SigninSignup from './pages/SigninSignup';
import PTDashboard from './pages/PT/PTDashboard';
import SendNoti from './pages/Admin/SendNoti';
import Exercise from './pages/Admin/Exercise';
import ExerciseDetail from './pages/Admin/ExerciseDetail';
import CreateExercise from './pages/Admin/CreateExercise';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in-sign-up" element={<SigninSignup />} />
        <Route path="/sendNoti" element={<SendNoti/>}/>
        <Route path="/Exercise" element={<Exercise/>} />
        <Route path="/Exercise-Detail/:id" element={<ExerciseDetail />} />
        <Route path="/Create-Exercise" element={<CreateExercise/>} />

        {/* PT Dashboard and nested routes */}
        <Route path="/pt/*" element={<PTDashboard />} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;