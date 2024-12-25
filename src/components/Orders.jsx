import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import axios from "axios";
import { toast } from 'react-toastify';

export default function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const [orders, setOrders] = useState([]);

//   // Fetch orders from the database
  function getOrders(){
    axios.get('http://localhost:3000/orders')
      .then(response => {
        const ordersLis = response.data.filter(customer => !customer.isAdmin); // Filter out admins
        setOrders(ordersLis);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      });
  }

  useEffect(getOrders,[]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCustomers = [...orders];
    updatedCustomers[index][name] = value;
    setOrders(updatedCustomers);
  };

  const handleSave = async (order, index) => {
    try {
      await axios.put(`http://localhost:3000/orders/${order._id}`, { status: order.status });
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:3000/orders/${orderId}`);
        setOrders(orders.filter(order => order._id !== orderId)); // Remove order from state
        toast.success('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete order');
      }
    }
  };
  return (
    <div className="flex h-screen overflow-auto">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

       
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <br />
        <br />
        <main className="grow">
         
         {/* <button onClick={()=>getUsers()} className='cursor-pointer'>load users</button> */}

         {/* orders area start  */}

         <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Order List</h2>
      <table className="table-auto w-full text-left bg-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">User Name</th>
            {/* <th className="px-4 py-2">Email</th> */}
            <th className="px-4 py-2">Shipping Address</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Date Ordered</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className="bg-white border-b">
              <td className="px-4 py-2">{order.user?.name || 'Unknown'}</td>
              {/* {order.user.email &&<td className="px-4 py-2">{order.user?.email || 'Unknown'}</td>} */}
              <td className="px-4 py-2">
                {order.shippingAddress1}, {order.shippingAddress2}, {order.city}, {order.country} - {order.zip}
              </td>
              <td className="px-4 py-2">{order.phone}</td>
              <td className="px-4 py-2">
                <select
                  name="status"
                  value={order.status}
                  onChange={(e) => handleInputChange(e, index)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="px-4 py-2">شيكل {order.totalPrice}</td>
              <td className="px-4 py-2">{new Date(order.dateOrdered).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleSave(order, index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        {/* orders area end  */}


        </main>
      </div>
    </div>
  );
}




