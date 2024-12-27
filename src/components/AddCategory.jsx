import React, { useState } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import axios from "axios";
import {toast} from 'react-toastify'

export default function AddCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    image: null,
    color:'black'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
    setImageUrl(URL.createObjectURL(e.target.files[0])); // To display the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('color', formData.color);
    data.append('image', formData.image);

    try {
      const response = await axios.post('https://zola-backend-q9aq.onrender.com/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });

      // Display success toast message
      toast.success('Category created successfully!');

      // Clear form fields after successful submission
      setFormData({
        name: '',
        image: null,
        color: ''
      });
      setImageUrl('');
    } catch (error) {
      // Display error toast message
      toast.error(`Error creating category: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <br />
        <br />
        <main className="grow">
          {/* Form Area Start */}
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Upload Icon */}
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
              Upload Icon
            </label>
            <input
              onChange={handleFileChange}
              name="image"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
            />
            {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 w-20 h-20 object-cover" />}

            {/* Category Color */}
            {/* <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter color..."
              required
            /> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {/* Form Area End */}
        </main>
      </div>
    </div>
  );
}
