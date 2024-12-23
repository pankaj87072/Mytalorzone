import React, { useState } from 'react';
import ComplaintForm from '../components/ComplaintForm';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Get in Touch</span>
          <h1>We're here to help</h1>
          <p>Have a question? We'd love to hear from you.</p>
        </div>
      </div>

      <section className="contact-options">
        <div className="options-grid">
          <div className="contact-option">
            <div className="option-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Visit</h3>
            <p>KIET Group of Institutions</p>
            <p>Delhi-NCR, Ghaziabad-Meerut Road</p>
            <p>Ghaziabad, UP 201206</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="option-link">
              Get Directions <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="contact-option">
            <div className="option-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>We'll respond as soon as possible</p>
            <a href="mailto:pankaj@gmail.com" className="option-link">
              pankaj@gmail.com <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="contact-option">
            <div className="option-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h3>Call</h3>
            <p>Mon-Sat 9:00 AM - 6:00 PM</p>
            <a href="tel:+919839366788" className="option-link">
              +91 98393 66788 <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you shortly.</p>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <iframe
            title="KIET Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.4770827073337!2d77.49742937547478!3d28.75330427561107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf47204fb9241%3A0xb84df59e26f08f8!2sKIET%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1710900000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="complaint-section">
        <ComplaintForm />
      </section>
    </div>
  );
};

export default Contact; 