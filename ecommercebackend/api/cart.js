const express = require('express');
const router = express.Router();
const Cart = require('../models/cartmodel');

// Get cart items
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { productsInCart: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, productQty } = req.body;
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({
        userId,
        productsInCart: [{ productId, productQty }]
      });
    } else {
      const existingProduct = cart.productsInCart.find(
        item => item.productId === productId
      );
      
      if (existingProduct) {
        existingProduct.productQty += productQty;
      } else {
        cart.productsInCart.push({ productId, productQty });
      }
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cart item
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, productQty } = req.body;
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const item = cart.productsInCart.find(
      item => item.productId === productId
    );
    
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    
    item.productQty = productQty;
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/remove/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.productsInCart = cart.productsInCart.filter(
      item => item.productId !== productId
    );
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
