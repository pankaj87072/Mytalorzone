import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import TopCarousel from '../components/TopCarousel';
import SearchHero from '../components/SearchHero';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Home = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const featuredProducts = products.slice(0, 6);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 1, 'M');
  };

  const handleWishlist = (product, e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="home">
      <TopCarousel />
      <SearchHero />

      <section className="featured-collection">
        <div className="section-header">
          <h2>Featured Collection</h2>
          <Link to="/shop" className="view-all">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="featured-products">
          {featuredProducts.map(product => (
            <div key={product.id} className="featured-product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image"
                    loading="lazy"
                  />
                  <div className="product-actions">
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="quick-add"
                      title="Add to Cart"
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <button 
                      onClick={(e) => handleWishlist(product, e)}
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
                        <span className="original-price">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="discount-tag">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="brand-categories">
        <div className="section-header">
          <h2>Our Collections</h2>
          <p className="section-subtitle">Discover our curated collection of timeless fashion</p>
        </div>
        
        <div className="categories-grid">
          <div className="category-card">
            <img 
              src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" 
              alt="Traditional Wear" 
            />
            <div className="category-content">
              <h3>Traditional Wear</h3>
              <p>Discover our exquisite collection of traditional Indian wear, featuring handcrafted details and timeless designs</p>
              <Link to="/shop?category=traditional" className="explore-btn">
                Explore Collection <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          
          <div className="category-card">
            <img 
              src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg" 
              alt="Fusion Wear" 
            />
            <div className="category-content">
              <h3>Fusion Wear</h3>
              <p>Experience the perfect blend of traditional elegance and modern sophistication</p>
              <Link to="/shop?category=fusion" className="explore-btn">
                Explore Collection <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          
          <div className="category-card">
            <img 
              src="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg" 
              alt="Western Wear" 
            />
            <div className="category-content">
              <h3>Western Wear</h3>
              <p>Elevate your style with our contemporary western collection designed for the modern woman</p>
              <Link to="/shop?category=western" className="explore-btn">
                Explore Collection <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p className="section-subtitle">Real experiences from our valued customers</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "The quality of their clothes is exceptional. I love how each piece feels unique 
                and special. The attention to detail in their traditional wear is remarkable!"
              </p>
            </div>
            <div className="testimonial-author">
              <img 
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" 
                alt="Priya Sharma"
                className="author-image"
              />
              <div className="author-info">
                <h4>Priya Sharma</h4>
                <p>Delhi</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "Their fusion wear collection is perfect for modern women who want to stay 
                connected to their roots while embracing contemporary style."
              </p>
            </div>
            <div className="testimonial-author">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                alt="Anjali Gupta"
                className="author-image"
              />
              <div className="author-info">
                <h4>Anjali Gupta</h4>
                <p>Mumbai</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "The customer service is outstanding! They helped me find the perfect outfit 
                for my sister's wedding. Couldn't be happier with my purchase!"
              </p>
            </div>
            <div className="testimonial-author">
              <img 
                src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg" 
                alt="Meera Patel"
                className="author-image"
              />
              <div className="author-info">
                <h4>Meera Patel</h4>
                <p>Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
