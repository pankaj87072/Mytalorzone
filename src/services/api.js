import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const cartAPI = {
  getCart: (userId) => api.get(`/cart/${userId}`),
  addToCart: (userId, productId, productQty) => 
    api.post('/cart/add', { userId, productId, productQty }),
  updateCart: (userId, productId, productQty) => 
    api.put('/cart/update', { userId, productId, productQty }),
  removeFromCart: (userId, productId) => 
    api.delete(`/cart/remove/${userId}/${productId}`),
};

export const complaintAPI = {
  submitComplaint: (complaintData) => api.post('/complaints/submit', complaintData),
  getComplaints: () => api.get('/complaints'),
  updateComplaintStatus: (complaintId, status) => 
    api.put(`/complaints/${complaintId}`, { status }),
};

export default api; 