import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <h2>Your Wishlist is Empty</h2>
        <p>Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
        <Link to="/shop" className="continue-shopping">
          <i className="fas fa-arrow-left"></i>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <div className="item-actions">
                <button 
                  onClick={() => addToCart(item, 1, 'M')}
                  className="move-to-cart"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="remove-from-wishlist"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-category">{item.category}</p>
              <div className="item-price">
                <span className="current-price">₹{item.price}</span>
                {item.originalPrice && (
                  <span className="original-price">₹{item.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 