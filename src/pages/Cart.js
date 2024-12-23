import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();

  const shipping = getCartTotal() >= 999 ? 0 : 99;
  const total = getCartTotal() + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="continue-shopping">
          <i className="fas fa-arrow-left"></i>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} items in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-size">Size: {item.size}</p>
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>

                <div className="item-price">
                  <span className="current-price">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">₹{item.originalPrice}</span>
                  )}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="remove-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal()}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>

          <Link to="/shop" className="continue-shopping">
            <i className="fas fa-arrow-left"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 