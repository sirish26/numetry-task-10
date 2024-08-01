import React from 'react';
import axios from 'axios';

const ProductList = ({ products, fetchProducts }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-list">
      <h2><center>Product List</center></h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Video</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <img src={product.images[0]} alt={product.name} width="100" height="100" />
              </td>
              <td>
                <video controls width="100" height="100">
                  <source src={product.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </td>
              <td>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
