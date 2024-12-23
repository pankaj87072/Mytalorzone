import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import debounce from 'lodash/debounce';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { searchQuery, handleSearch } = useSearch();
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user } = useAuth();

  const announcements = [
    "NEW ARRIVALS - Get 20% off on your first purchase!",
    "FREE SHIPPING on orders above ₹999",
    "FESTIVE SALE - Up to 50% off on ethnic wear",
    "Sign up now and get ₹500 off on your first order"
  ];

  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(localSearch);
    navigate('/shop');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="announcement-banner">
        <div className="announcement-content">
          {announcements.map((text, index) => (
            <span 
              key={index} 
              className={`announcement-text ${index === currentAnnouncementIndex ? 'active' : ''}`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-left">
          <Link to="/" className="brand-link">
            <h1 className="brand-name">Mytalorzone By Sahiba</h1>
          </Link>
        </div>

        <div className="nav-center">
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/shop" className="nav-link">Shop</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>

        <div className="nav-right">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search..."
                value={localSearch}
                onChange={handleSearchChange}
              />
            </div>
          </form>
          <Link 
            to={user ? "/account" : "/login"} 
            className="nav-icon-link"
            title={user ? "My Account" : "Login"}
          >
            <i className="fas fa-user"></i>
            {user && <span className="account-indicator"></span>}
          </Link>
          {user && (
            <>
              <Link to="/wishlist" className="nav-icon-link">
                <i className="fas fa-heart"></i>
                {getWishlistCount() > 0 && (
                  <span className="wishlist-count">{getWishlistCount()}</span>
                )}
              </Link>
              <Link to="/cart" className="nav-icon-link">
                <i className="fas fa-shopping-bag"></i>
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;