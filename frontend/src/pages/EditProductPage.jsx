import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      console.log("Product updated");

      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p className='text-center'>Loading product details...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
        <form onSubmit={handleUpdateProduct} className='space-y-4'>
          <div>
            <label className='block text-gray-700'>Product Name</label>
            <input
              type='text'
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700'>Description</label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700'>Price</label>
            <input
              type='number'
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700'>Image URL</label>
            <input
              type='url'
              value={product.imageUrl}
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
              className='w-full p-2 border border-gray-300 rounded-lg'
            />
          </div>
          <div className='flex justify-between mt-4'>
            <button
              type='button'
              onClick={() => navigate("/")}
              className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
