import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';

const SearchHero = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { handleSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(localSearch);
  };

  return (
    <div className="search-hero">
      <h2>Find Your Perfect Style</h2>
      <form onSubmit={handleSubmit}>
        <div className="hero-search-box">
          <input
            type="text"
            placeholder="Search for products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero; 