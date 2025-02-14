import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import the CSS file

const Navigation = () => {
  return (
    <nav className="nav">
      <h1 className="logo">GYM FITNESS</h1>
      <ul className="nav-links">
        <li><Link to="/features" className="nav-link">FEATURES</Link></li>
        <li><Link to="/about" className="nav-link">ABOUT</Link></li>
        <li><Link to="/services" className="nav-link">SERVICES</Link></li>
        <li><Link to="/gallery" className="nav-link">GALLERY</Link></li>
        <li><Link to="/testimonials" className="nav-link">TESTIMONIALS</Link></li>
        <li><Link to="/team" className="nav-link">TEAM</Link></li>
        <li><Link to="/contact" className="nav-link">CONTACT</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation; 