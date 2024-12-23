import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  { name: 'Traditional Dress', description: 'Beautiful traditional dress', price: 49.99, image: 'link-to-image' },
  { name: 'Western Top', description: 'Stylish western top', price: 29.99, image: 'link-to-image' },
  // Add more products here
];

const ProductListing = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Shop Our Collection</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  </div>
);

export default ProductListing;
