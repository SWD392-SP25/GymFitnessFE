import React from "react";
import '../../../public/css/bootstrap.css';

export const Navigation = (props) => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'page-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a 
            className="navbar-brand" 
            href="#page-top"
            onClick={(e) => handleScroll(e, 'page-top')}
          >
            REACT LANDING PAGE
          </a>
        </div>

        <div className="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll" onClick={(e) => handleScroll(e, 'features')}>
                FEATURES
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll" onClick={(e) => handleScroll(e, 'about')}>
                ABOUT
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll" onClick={(e) => handleScroll(e, 'services')}>
                SERVICES
              </a>
            </li>
            <li>
              <a href="#gallery" className="page-scroll" onClick={(e) => handleScroll(e, 'gallery')}>
                GALLERY
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll" onClick={(e) => handleScroll(e, 'testimonials')}>
                TESTIMONIALS
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll" onClick={(e) => handleScroll(e, 'team')}>
                TEAM
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll" onClick={(e) => handleScroll(e, 'contact')}>
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
