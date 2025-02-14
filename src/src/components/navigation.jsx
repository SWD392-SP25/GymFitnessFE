import React from "react";
import { Link } from "react-scroll";
import '../../../public/css/bootstrap.css';

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link 
            className="navbar-brand" 
            to="page-top"
            spy={true}
            smooth={true}
            duration={500}
          >
            REACT LANDING PAGE
          </Link>
        </div>

        <div className="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link 
                to="features" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                FEATURES
              </Link>
            </li>
            <li>
              <Link 
                to="about" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link 
                to="services" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link 
                to="gallery" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                GALLERY
              </Link>
            </li>
            <li>
              <Link 
                to="testimonials" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                TESTIMONIALS
              </Link>
            </li>
            <li>
              <Link 
                to="team" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                TEAM
              </Link>
            </li>
            <li>
              <Link 
                to="contact" 
                className="page-scroll"
                spy={true}
                smooth={true}
                duration={500}
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
