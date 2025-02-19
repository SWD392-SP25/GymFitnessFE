import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import the CSS file

const Navigation = () => {
  return (
    <nav className="nav">
      <h1 className="logo">GYM FITNESS</h1>
      <ul className="nav-links">
        <li><a href="#feature" className="nav-link">ABOUT US</a></li>
        <li><a href="#services" className="nav-link">SERVICES</a></li>
        <li><a href="#packages" className="nav-link">COURSES</a></li>
        <li><a href="#contact" className="nav-link">CONTACT</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
