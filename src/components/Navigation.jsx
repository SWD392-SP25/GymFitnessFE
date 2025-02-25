import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css"; // Import file CSS

const Navigation = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/sign-in-sign-up"; // Kiểm tra nếu đang ở trang đăng nhập

  return (
    <nav className="nav">
      {/* Link logo về trang Landing */}
      <Link to="/" className="logo">GYM FITNESS</Link>

      {/* Ẩn menu nếu đang ở trang đăng nhập */}
      {!isLoginPage && (
        <ul className="nav-links">
          <li><a href="#feature" className="nav-link">ABOUT US</a></li>
          <li><a href="#services" className="nav-link">SERVICES</a></li>
          <li><a href="#packages" className="nav-link">COURSES</a></li>
          <li><a href="#contact" className="nav-link">CONTACT</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
