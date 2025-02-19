import React from 'react';
import Navigation from '../components/Navigation';
import Feature from '../components/Feature/Feature';
import Services from '../components/Services/Services';
import Contact from '../components/Contact/Contact';
import Package from '../components/Package/Package';
import landingclasses from './Landing.module.css';

const Landing = () => {
  return (
    <div className={landingclasses.landing}>
      <Navigation />
      <section id="feature">
        <Feature />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="packages">
        <Package />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};


export default Landing;
