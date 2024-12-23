import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Account = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditing(false);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="account-page">
      <div className="account-hero">
        <div className="hero-content">
          <h1>Welcome, {user.name}</h1>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      <div className="account-container">
        <div className="account-sidebar">
          <div className="account-stats">
            <div className="stat-card">
              <span className="stat-number">{wishlistItems.length}</span>
              <span className="stat-label">Wishlist Items</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{cartItems.length}</span>
              <span className="stat-label">Cart Items</span>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Sign Out
          </button>
        </div>

        <div className="account-main">
          <div className="profile-section">
            <div className="section-header">
              <h2>Profile Information</h2>
              <button 
                onClick={() => setEditing(!editing)}
                className="edit-btn"
              >
                {editing ? (
                  <>
                    <i className="fas fa-times"></i>
                    Cancel
                  </>
                ) : (
                  <>
                    <i className="fas fa-pen"></i>
                    Edit
                  </>
                )}
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>
                </div>
                <button type="submit" className="save-btn">
                  <i className="fas fa-check"></i>
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="info-label">Address</span>
                    <span className="info-value">{user.address || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 