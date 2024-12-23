import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await cartAPI.getCart(user.id);
      setCartItems(data.productsInCart || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product, quantity) => {
    if (!user) {
      throw new Error('Please login to add items to cart');
    }

    try {
      await cartAPI.addToCart(user.id, product.id, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      await cartAPI.removeFromCart(user.id, productId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;

    try {
      await cartAPI.updateCart(user.id, productId, newQuantity);
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw new Error('Failed to update quantity');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.productQty * item.price), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.productQty, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 