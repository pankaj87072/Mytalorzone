import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} loading="lazy" />
          <div className="product-actions">
            <button 
              onClick={handleAddToCart}
              className="quick-add"
              title="Add to Cart"
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
            <button 
              onClick={handleWishlist}
              className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              title="Add to Wishlist"
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
        <div className="product-info">
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
          </div>
          <div className="product-price">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                <span className="discount-tag">{discount}% OFF</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.displayName = 'ProductCard';
export default ProductCard;
