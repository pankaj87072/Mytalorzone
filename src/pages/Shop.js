import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const Shop = () => {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'newest'
  });
  const [activeFilters, setActiveFilters] = useState(false);

  const categories = ['all', 'traditional', 'ethnic', 'fusion', 'bridal', 'western'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹1,000', value: '0-1000' },
    { label: '₹1,000 - ₹3,000', value: '1000-3000' },
    { label: '₹3,000 - ₹5,000', value: '3000-5000' },
    { label: 'Above ₹5,000', value: '5000-above' }
  ];
  const sortOptions = [
    { label: 'None', value: 'none' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Popularity', value: 'popularity' }
  ];

  useEffect(() => {
    // Get search query from URL
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    filterProducts();
  }, [filters, searchQuery]);

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max === undefined) {
          return product.price >= min;
        }
        return product.price >= min && product.price <= max;
      });
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'none':
      default:
        // Keep original order
        filtered.sort((a, b) => a.id - b.id);
        break;
    }

    setFilteredProducts(filtered);
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    if (index >= filteredProducts.length) return null;
    const product = filteredProducts[index];
    
    const cellStyle = {
      ...style,
      padding: '15px',
      boxSizing: 'border-box'
    };
    
    return (
      <div style={cellStyle} className="grid-cell">
        <ProductCard product={product} />
      </div>
    );
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Our Collections</h1>
        <div className="search-filters">
          <div className="shop-search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="filter-toggle"
            onClick={() => setActiveFilters(!activeFilters)}
          >
            <i className="fas fa-sliders-h"></i>
            Filters
          </button>
        </div>
      </div>

      <div className={`shop-content ${activeFilters ? 'filters-active' : ''}`}>
        <aside className="shop-filters">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${filters.category === category ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, category})}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="filter-options">
              {priceRanges.map(range => (
                <button
                  key={range.value}
                  className={`filter-btn ${filters.priceRange === range.value ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, priceRange: range.value})}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <div className="filter-options">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-btn ${filters.sortBy === option.value ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, sortBy: option.value})}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="shop-products">
          <div className="products-header">
            <p>{filteredProducts.length} products found</p>
          </div>
          <div className="products-grid" style={{ height: '800px' }}>
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  columnCount={3}
                  columnWidth={width / 3}
                  height={height}
                  rowCount={Math.ceil(filteredProducts.length / 3)}
                  rowHeight={450}
                  width={width}
                >
                  {Cell}
                </Grid>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 