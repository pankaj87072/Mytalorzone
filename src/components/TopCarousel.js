import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "The Royal Collection",
      subtitle: "Elegance Redefined",
      description: "Discover our handcrafted pieces that blend traditional artistry with contemporary design",
      link: "/collection/royal"
    },
    {
      image: "https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Luxury Ethnic Wear",
      subtitle: "Timeless Heritage",
      description: "Each piece tells a story of craftsmanship and cultural richness",
      link: "/collection/luxury"
    },
    {
      image: "https://images.pexels.com/photos/7760743/pexels-photo-7760743.jpeg?auto=compress&cs=tinysrgb&w=1920",
      title: "Designer Collection",
      subtitle: "Where Art Meets Fashion",
      description: "Exclusive designs that celebrate individuality and sophistication",
      link: "/collection/designer"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % carouselItems.length
      );
    }, 6000); // Slower transition for more premium feel

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % carouselItems.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? carouselItems.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
              <span className="carousel-eyebrow">Mytalorzone Presents</span>
              <h2>{item.title}</h2>
              <p className="carousel-subtitle">{item.subtitle}</p>
              <p className="carousel-description">{item.description}</p>
              <div className="carousel-buttons">
                <Link to={item.link} className="carousel-btn primary">
                  Shop Now
                </Link>
                <Link to={`${item.link}/learn-more`} className="carousel-btn secondary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button className="carousel-control prev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button className="carousel-control next" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default TopCarousel; 