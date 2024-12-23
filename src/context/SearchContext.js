import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext); 