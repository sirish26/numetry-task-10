import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app">
    <ProductForm fetchProducts={fetchProducts} />
      <ProductList products={products} fetchProducts={fetchProducts} />
      
    </div>
  );
};

export default App;
