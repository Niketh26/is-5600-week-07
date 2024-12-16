/*
import React, { useState } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  /** 
   * TODO
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 

/*
  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        <table className="w-100">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th>
              <th className="tl pv2">Buyer Email</th>
              <th className="tl pv2">Products</th>
              <th className="tl pv2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{order.products.join(', ')}</td>
                <td className="tl pv2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
*/


import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]); // state to store the orders
  const [loading, setLoading] = useState(true); // state to track loading status

  /**
   * Fetch the orders from the API and update the orders state.
   */
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://redesigned-waddle-694p7764v49ph5px9-3080.app.github.dev/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data); // update the orders state with fetched data
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false); // set loading to false once the request is completed
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Show loading spinner while the data is being fetched
  if (loading) return <div className="loading-spinner">Loading...</div>;

  // Show a message if no orders are found
  if (!orders.length) return <div>No orders found</div>;

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        <table className="w-100">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th>
              <th className="tl pv2">Buyer Email</th>
              <th className="tl pv2">Products</th>
              <th className="tl pv2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{order.products.join(', ')}</td>
                <td className="tl pv2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;