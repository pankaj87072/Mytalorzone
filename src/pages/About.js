import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Our Story</span>
          <h1>Crafting Fashion with Purpose</h1>
          <p>Discover the journey of Mytalorzone By Sahiba</p>
        </div>
      </div>

      <section className="about-intro">
        <div className="intro-content">
          <span className="section-eyebrow">Est. 2024</span>
          <h2>A Vision for Modern Fashion</h2>
          <p>
            Founded with a passion for blending traditional craftsmanship with contemporary design, 
            Mytalorzone By Sahiba represents the future of Indian fashion. Our journey began in 2024, 
            with a simple yet powerful vision: to create clothing that celebrates both heritage and innovation.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-gem"></i>
            </div>
            <h3>Quality First</h3>
            <p>Uncompromising attention to detail and premium materials in every piece</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>Sustainability</h3>
            <p>Committed to eco-friendly practices and responsible fashion</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Craftsmanship</h3>
            <p>Supporting local artisans and preserving traditional techniques</p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="mission-content">
          <div className="mission-text">
            <span className="section-eyebrow">Our Mission</span>
            <h2>Empowering Through Fashion</h2>
            <p>
              We believe fashion should be more than just clothing—it should be a form of self-expression, 
              a celebration of culture, and a force for positive change. Every piece we create is designed 
              to make you feel confident, beautiful, and connected to our shared heritage.
            </p>
          </div>
          <div className="mission-image">
            <img 
              src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg" 
              alt="Fashion Design Process" 
            />
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="cta-content">
          <h2>Experience the Difference</h2>
          <p>Join us in redefining fashion for the modern era</p>
          <a href="/shop" className="cta-button">
            Explore Collections
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default About; 