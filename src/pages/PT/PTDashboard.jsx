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
          <h2>PT Dashboard</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <NavLink 
                to="/pt/courses" 
                className={({isActive}) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/courses')}
              >
                <FiVideo className={styles.navIcon} />
                <span>Course Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/pt/free-samples" 
                className={({isActive}) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/free-samples')}
              >
                <FiPlayCircle className={styles.navIcon} />
                <span>Free Sample Videos</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/pt/chats" 
                className={({isActive}) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/chats')}
              >
                <FiMessageSquare className={styles.navIcon} />
                <span>Customer Chats</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/pt/financial" 
                className={({isActive}) => clsx(styles.navLink, { [styles.active]: isActive })}
                onClick={() => handleNavClick('/pt/financial')}
              >
                <FiBarChart2 className={styles.navIcon} />
                <span>Financial Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/pt/profile" 
                className={({isActive}) => clsx(styles.navLink, { [styles.active]: isActive })}
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