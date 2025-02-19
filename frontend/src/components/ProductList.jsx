import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import { Link } from "react-router-dom";
import axios from 'axios';
const ProductList = () => {
  const [products, setProducts] = useState([]);

  // const products = [
  // {
  //   id: 1,
  //   name: "Wireless Bluetooth Earbuds",
  //   description: "High-quality sound with noise cancellation feature.",
  //   price: 59.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 2,
  //   name: "Smartwatch Fitness Tracker",
  //   description: "Track your heart rate, steps, and sleep patterns.",
  //   price: 129.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 3,
  //   name: "Portable Bluetooth Speaker",
  //   description: "Waterproof and portable with 12-hour battery life.",
  //   price: 39.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 4,
  //   name: "Wireless Charging Pad",
  //   description: "Fast charging pad compatible with all Qi-enabled devices.",
  //   price: 19.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 5,
  //   name: "Noise-Cancelling Headphones",
  //   description: "Over-ear headphones with active noise cancellation.",
  //   price: 199.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 6,
  //   name: "4K Ultra HD Smart TV",
  //   description: "55-inch 4K UHD Smart TV with HDR and Alexa built-in.",
  //   price: 499.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 7,
  //   name: "Gaming Laptop",
  //   description: "High-performance gaming laptop with RTX 3060 GPU.",
  //   price: 1299.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 8,
  //   name: "Electric Coffee Grinder",
  //   description: "Stainless steel blades with multiple grind settings.",
  //   price: 29.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 9,
  //   name: "Air Fryer",
  //   description: "Healthy cooking with little to no oil required.",
  //   price: 89.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 10,
  //   name: "Robot Vacuum Cleaner",
  //   description: "Smart navigation with app control and auto-recharge.",
  //   price: 299.99,
  //   imageUrl: "https://via.placeholder.com/150",
  // },
  // ];
 
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      console.log(response.data); // Display product data
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    // await deleteProduct(id);
    // setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {products.map((product) => (
          <div key={product.id} className='border p-4 rounded-lg shadow-lg'>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='w-full h-48 object-cover mb-4'
            />
            <h3 className='text-xl font-semibold'>{product.name}</h3>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-green-600 font-bold'>${product.price}</p>
            <div className='mt-4 space-x-2'>
              <Link
                to={`/edit-product/${product.id}`}
                className='bg-yellow-500 text-white px-4 py-2 rounded'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className='bg-red-500 text-white px-4 py-2 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
