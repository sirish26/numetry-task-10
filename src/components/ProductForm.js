import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    images: [],
    video: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: imageUrls });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setFormData({ ...formData, video: videoUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData); 
      fetchProducts();
      setFormData({ name: '', price: '', description: '', images: [], video: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-form">
      <h2><center>Add Product</center></h2>
      <form onSubmit={handleSubmit}>
      <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} multiple />
        <label>video:</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
