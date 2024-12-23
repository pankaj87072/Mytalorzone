import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    try {
      if (!selectedSize) {
        setError('Please select a size');
        return;
      }

      addToCart(product, quantity, selectedSize);
      setAddedToCart(true);
      setError('');
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (err) {
      setError('Failed to add to cart. Please try again.');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-details-page">
      <div className="product-breadcrumb">
        Shop / {product.category} / {product.name}
      </div>

      <div className="product-details-container">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-price">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                <span className="discount-tag">{discount}% OFF</span>
              </>
            )}
          </div>

          <div className="size-selector">
            <h3>Select Size</h3>
            <div className="size-options">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <h3>Quantity</h3>
            <div className="quantity-section">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <button 
                className={`quick-add-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <i className="fas fa-check"></i>
                    Added
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="product-actions">
            <div className="action-wrapper">
              {error && <div className="error-message">{error}</div>}
              <div className="main-actions">
                <button 
                  className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <i className="fas fa-check"></i>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart"></i>
                      Add to Cart
                    </>
                  )}
                </button>
                <button 
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={handleWishlist}
                  title="Add to Wishlist"
                >
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="product-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="delivery-info">
            <div className="delivery-option">
              <i className="fas fa-truck"></i>
              <span>Free delivery on orders above ₹999</span>
            </div>
            <div className="delivery-option">
              <i className="fas fa-undo"></i>
              <span>Easy 30 days return & exchange</span>
            </div>
            <div className="delivery-option">
              <i className="fas fa-shield-alt"></i>
              <span>100% secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 