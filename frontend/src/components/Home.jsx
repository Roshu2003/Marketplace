import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", newProduct);
      setIsAddingProduct(false);
      setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name && product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOrderNow = (id) => {
    navigate(`/order/${id}`);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-800'>
              Product Listings
            </h1>
            <p className='text-gray-600 mt-2'>
              Browse and manage your products
            </p>
          </div>
          <button
            onClick={() => setIsAddingProduct(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-150 ease-in-out'
          >
            Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className='relative mb-8'>
          <input
            type='text'
            placeholder='Search for products...'
            className='w-full p-4 pl-12 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className='absolute left-4 top-4 text-gray-400'>🔍</span>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out'
            >
              <div className='relative h-48 bg-gray-200'>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Product image not available";
                    }}
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                    <span className='text-gray-400 text-4xl'>📷</span>
                  </div>
                )}
              </div>
              <div className='p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <h2 className='text-xl font-bold text-gray-800'>
                    {product.name}
                  </h2>
                  <span className='text-2xl font-bold text-blue-600'>
                    ${product.price}
                  </span>
                </div>
                <p className='text-gray-600 mb-4 line-clamp-2'>
                  {product.description}
                </p>
                <div className='flex justify-between items-center'>
                  <button
                    onClick={() => handleOrderNow(product.id)}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-150 ease-in-out'
                  >
                    Order Now
                  </button>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                      className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition duration-150 ease-in-out'
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className='text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition duration-150 ease-in-out'
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Modal */}
        {isAddingProduct && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md'>
              <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>
              <form onSubmit={handleAddProduct} className='space-y-4'>
                <div>
                  <label className='block text-gray-700 mb-2'>
                    Product Name
                  </label>
                  <input
                    type='text'
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-2'>Price</label>
                  <input
                    type='number'
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-2'>Image URL</label>
                  <input
                    type='url'
                    value={newProduct.imageUrl}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, imageUrl: e.target.value })
                    }
                    className='w-full p-2 border border-gray-300 rounded-lg'
                  />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={() => setIsAddingProduct(false)}
                    className='px-4 py-2 text-gray-600 hover:text-gray-800'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className='text-center py-12'>
            <span className='text-4xl mb-4 block'>🔍</span>
            <h3 className='text-xl font-medium text-gray-600'>
              No products found
            </h3>
            <p className='text-gray-500'>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
