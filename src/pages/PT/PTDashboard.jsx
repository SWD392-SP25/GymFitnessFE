// PTDashboard.jsx
import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './PTDashboard.module.css';

// Import the components for each tab
import CourseManagement from './components/CourseManagement/CourseManagement';
import FreeSampleVideos from './components/FreeSampleVideos/FreeSampleVideos';
import CustomerChats from './components/CustomerChats/CustomerChats';
import FinancialReports from './components/FinancialReports/FinancialReports';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';

// Import icons (assuming you're using some icon library like react-icons)
import {
  FiVideo, FiPlayCircle, FiMessageSquare,
  FiBarChart2, FiUser, FiMenu, FiX
} from 'react-icons/fi';

const PTDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className={styles.ptDashboard}>
      {/* Mobile menu toggle button */}


      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, { [styles.mobileOpen]: isMobileMenuOpen })}>
        <div className={styles.sidebarHeader}>
          <button
            onClick={() => navigate('/dashboard')}
            className={styles.backButton}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
          <h2>PT Dashboard</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <NavLink
                to="/pt/courses"
                className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/courses')}
              >
                <FiVideo className={styles.navIcon} />
                <span>Course Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pt/free-samples"
                className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/free-samples')}
              >
                <FiPlayCircle className={styles.navIcon} />
                <span>Free Sample Videos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pt/chats"
                className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/chats')}
              >
                <FiMessageSquare className={styles.navIcon} />
                <span>Customer Chats</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pt/financial"
                className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/financial')}
              >
                <FiBarChart2 className={styles.navIcon} />
                <span>Financial Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pt/profile"
                className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/profile')}
              >
                <FiUser className={styles.navIcon} />
                <span>Profile Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/free-samples" element={<FreeSampleVideos />} />
          <Route path="/chats" element={<CustomerChats />} />
          <Route path="/financial" element={<FinancialReports />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="*" element={<CourseManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default PTDashboard;