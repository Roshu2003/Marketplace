import React, { useEffect, useState } from "react";
import { getOrders } from "../api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Orders</h2>
      <div className='space-y-4'>
        {orders.map((order) => (
          <div key={order.id} className='border p-4 rounded-lg shadow-lg'>
            <p className='text-gray-600'>Order ID: {order.id}</p>
            <p className='text-gray-600'>Product ID: {order.productId}</p>
            <p className='text-gray-600'>
              Buyer: {order.buyerName} ({order.buyerEmail})
            </p>
            <p className='text-gray-600'>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
