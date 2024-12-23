import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Mytalorzone By Sahiba</h3>
          <p>Crafting elegance through traditional and contemporary fashion.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/shop?category=traditional">Traditional</Link></li>
            <li><Link to="/shop?category=western">Western</Link></li>
            <li><Link to="/shop?category=fusion">Fusion</Link></li>
            <li><Link to="/shop?category=bridal">Bridal</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              123 Fashion Street, Delhi, India
            </li>
            <li>
              <i className="fas fa-phone"></i>
              +91 9839366788
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              info@mytalorzone.com
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Mytalorzone By Sahiba. All rights reserved.</p>
          <p className="developer-credit">
            Website created by Pankaj Kumar Gupta | <a href="tel:+919839366788">+91 9839366788</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 