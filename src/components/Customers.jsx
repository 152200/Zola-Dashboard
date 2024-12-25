import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import axios from "axios";
import { toast } from 'react-toastify';

export default function Customers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const [customers, setCustomers] = useState([]);

//   // Fetch customers from the database
  function getUsers(){
    axios.get('http://localhost:3000/users')
      .then(response => {
        const customerList = response.data.filter(customer => !customer.isAdmin); // Filter out admins
        setCustomers(customerList);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        toast.error('Failed to load customers');
      });
  }

  useEffect(getUsers,[]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCustomers = [...customers];
    updatedCustomers[index][name] = value;
    setCustomers(updatedCustomers);
  };

  const handleSave = async (customer, index) => {
    try {
      await axios.put(`http://localhost:3000/users/${customer._id}`, customer);
      toast.success('Customer details updated successfully');
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer details');
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

         {/* customers area start  */}

         <div className="container mx-auto my-auto">
      <h2 className="text-2xl font-bold mb-5">Customer List</h2>
      <table className="table-auto w-full text-left bg-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">town</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} className="bg-white border-b">
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="street"
                  value={customer.street}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="city"
                  value={customer.apartment}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleSave(customer, index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        {/* customers area end  */}


        </main>
      </div>
    </div>
  );
}




{/* <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Customer List</h2>
      <table className="table-auto w-full text-left bg-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Street</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} className="bg-white border-b">
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="street"
                  value={customer.street}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="city"
                  value={customer.city}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleSave(customer, index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}