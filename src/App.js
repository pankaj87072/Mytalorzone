import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import './App.css';
import { SearchProvider } from './context/SearchContext';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePopup from './components/WelcomePopup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="App">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/account" 
                    element={
                      <ProtectedRoute>
                        <Account />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
                <Footer />
                <WelcomePopup />
              </div>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
