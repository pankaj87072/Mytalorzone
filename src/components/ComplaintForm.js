import React, { useState } from 'react';
import { complaintAPI } from '../services/api';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    userType: 'customer'
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await complaintAPI.submitComplaint(formData);
      setStatus('Complaint submitted successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
        userType: 'customer'
      });
    } catch (error) {
      setStatus('Failed to submit complaint. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="complaint-form">
      <h2>Submit a Complaint</h2>
      {status && <div className="status-message">{status}</div>}
      <form onSubmit={handleSubmit}>
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
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm; 