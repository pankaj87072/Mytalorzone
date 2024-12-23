import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't show popup if user is logged in or has dismissed it before
    if (!user && !localStorage.getItem('welcomePopupDismissed')) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Show popup after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('welcomePopupDismissed', 'true');
  };

  const handleNavigate = (path) => {
    setIsVisible(false);
    navigate(path);
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-popup-overlay">
      <div className="welcome-popup">
        <button className="close-btn" onClick={handleDismiss}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="popup-content">
          <span className="popup-eyebrow">Welcome to Mytalorzone</span>
          <h2>Sign in for a better experience</h2>
          <p>
            Join us to unlock exclusive benefits, save your favorites, and get personalized recommendations.
          </p>
          
          <div className="popup-actions">
            <button 
              className="primary-btn"
              onClick={() => handleNavigate('/login')}
            >
              Sign In
            </button>
            <button 
              className="secondary-btn"
              onClick={() => handleNavigate('/register')}
            >
              Create Account
            </button>
          </div>

          <button className="skip-btn" onClick={handleDismiss}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup; 