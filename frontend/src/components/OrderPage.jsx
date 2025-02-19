import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        // Validate, clean, and sort the data
        const validOrders = (response.data || [])
          .map((order) => ({
            ...order,
            id: order.id || "N/A",
            buyerName: order.buyerName || "Unknown",
            productId: order.productId || "N/A",
            orderStatus: order.orderStatus || "pending",
            createdAt: order.createdAt || new Date().toISOString(),
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date
        setOrders(validOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status = "") => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border border-blue-200",
      shipped: "bg-green-100 text-green-800 border border-green-200",
      delivered: "bg-purple-100 text-purple-800 border border-purple-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
    };
    return (
      statusMap[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent'></div>
        <span className='ml-3 text-lg text-gray-600 font-medium'>
          Loading orders...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto mt-8 p-6 bg-red-50 rounded-lg border border-red-200'>
        <div className='text-center text-red-600'>
          <div className='mx-auto h-12 w-12 text-2xl'>⚠️</div>
          <h3 className='mt-2 text-lg font-medium'>{error}</h3>
          <p className='mt-1 text-sm'>
            Please try again later or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200'>
        <div className='border-b bg-gradient-to-r from-gray-50 to-white p-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>Your Orders</h2>
              <p className='text-sm text-gray-500 mt-1'>
                Sorted by creation date
              </p>
            </div>
            <span className='px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100'>
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>
        </div>

        <div className='divide-y divide-gray-200'>
          {orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12'>
              <div className='text-gray-400 text-6xl mb-4'>📦</div>
              <p className='text-xl text-gray-500 font-medium'>
                No orders found
              </p>
              <p className='text-sm text-gray-400 mt-2'>
                Your orders will appear here once you make a purchase
              </p>
            </div>
          ) : (
            <div className='max-h-[600px] overflow-y-auto'>
              {orders.map((order) => (
                <div
                  key={order.id || Math.random()}
                  className='p-6 hover:bg-gray-50 transition-colors duration-150 ease-in-out'
                >
                  <div className='flex justify-between items-start'>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <p className='font-medium text-lg text-gray-900'>
                          Order #{order.id}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus || "pending"}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600'>
                        Placed by {order.buyerName}
                      </p>
                      <p className='text-xs text-gray-400'>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 flex items-center'>
                    <span className='text-sm text-gray-500 mr-2'>
                      Product ID:
                    </span>
                    <code className='px-3 py-1 bg-gray-100 text-gray-700 rounded-md font-mono text-sm'>
                      {order.productId}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
