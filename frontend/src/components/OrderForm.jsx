// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const OrderForm = () => {
//   const { id } = useParams(); // Get productId from URL
//   const [orderData, setOrderData] = useState({
//     productId: id, // Use the extracted productId
//     customerName: "",
//     quantity: 1,
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(orderData);

//     try {
//       await axios.post("http://localhost:5000/api/orders", orderData);
//       alert("Order placed successfully!");
//       navigate(`/`);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("There was an error placing the order.");
//     }
//   };

//   return (
//     <div className='container mx-auto p-4'>
//       <h2 className='text-2xl font-bold mb-4'>Place Order</h2>
//       <form onSubmit={handleSubmit} className='space-y-4'>
//         <input
//           type='text'
//           placeholder='Customer Name'
//           value={orderData.customerName}
//           onChange={(e) =>
//             setOrderData({ ...orderData, customerName: e.target.value })
//           }
//           className='w-full p-2 border rounded'
//           required
//         />
//         <input
//           type='number'
//           placeholder='Quantity'
//           value={orderData.quantity}
//           onChange={(e) =>
//             setOrderData({ ...orderData, quantity: e.target.value })
//           }
//           className='w-full p-2 border rounded'
//           required
//         />
//         <button
//           type='submit'
//           className='bg-blue-500 text-white px-4 py-2 rounded'
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OrderForm;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    productId: id,
    buyerName: "",
    shippingAddress: "",
    quantity: 1,
    contactNumber: "",
  });

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:5000/api/orders", {
  //       productId: id,
  //       ...formData,
  //     });
  //     navigate("/orders");
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //     setError("Failed to create order. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await axios.post("http://localhost:5000/api/orders", formData);
      alert("Order placed successfully!");
      navigate(`/orders`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing the order.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }

  if (!error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center'>
          <div className='text-red-500 text-5xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>{error}</h2>
          <p className='text-gray-600 mb-4'>
            Please try again or contact support
          </p>
          <button
            onClick={() => navigate("/")}
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-150'
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          {/* Product Summary Section */}
          <div className='border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white p-6'>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>
              Complete Your Order
            </h1>
            {product && (
              <div className='flex items-start space-x-6'>
                <div className='w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
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
                    <div className='w-full h-full flex items-center justify-center'>
                      <span className='text-4xl'>📦</span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>
                    {product.name}
                  </h2>
                  <p className='text-gray-600 mt-1'>{product.description}</p>
                  <p className='text-2xl font-bold text-blue-600 mt-2'>
                    ${product.price}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Form Section */}
          <div className='p-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='buyerName'
                    required
                    value={formData.buyerName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150'
                    placeholder='Enter your full name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Contact Number
                  </label>
                  <input
                    type='tel'
                    name='contactNumber'
                    required
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150'
                    placeholder='Enter your contact number'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Shipping Address
                </label>
                <textarea
                  name='shippingAddress'
                  required
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  rows='3'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150'
                  placeholder='Enter your complete shipping address'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quantity
                </label>
                <input
                  type='number'
                  name='quantity'
                  min='1'
                  required
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150'
                />
              </div>

              <div className='border-t pt-6 flex justify-between items-center'>
                <button
                  type='button'
                  onClick={() => navigate("/")}
                  className='px-6 py-2 text-gray-600 hover:text-gray-800 transition duration-150'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition duration-150'
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
