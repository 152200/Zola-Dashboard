import React, { useState, useEffect } from 'react';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import axios from "axios";
import { toast } from 'react-toastify';

export default function UploadImage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]); // For multiple image previews
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    richDescription: '',
    image: null, // Single image
    images: [], // Multiple images
    brand: '',
    price: '',
    discount: '',
    category: '',
    countInStock: '',
    rating: '',
    numReviews: '',
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle single image upload
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    
    // Display preview for single image
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // Handle multiple images upload
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files, // Store array of image files
    });

    // Create preview for each selected image
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData.images.forEach(image => {
          data.append('images', image); // Append multiple images
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('https://zola-backend-q9aq.onrender.com/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      toast.success("تمت إضافة المنتج بنجاح");

      // Clear the form
      setFormData({
        name: '',
        description: '',
        richDescription: '',
        image: null,
        images: [],
        brand: '',
        price: '',
        discount: '',
        category: '',
        countInStock: '',
        rating: '',
        numReviews: '',
        isFeatured: false,
      });
      setImageUrl('');
      setImagePreviews([]);
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
      toast.error(error.message)
    }
  };



    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`https://zola-backend-q9aq.onrender.com/categories`);
                setBrands(response.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        
        fetchBrands();
    }, []);

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
          {/* Form Area Start */}
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                اسم المنتج
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            {/* Product Description */}
            <div className="mb-5">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                الوصف
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Single Image Upload */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                الصورة الرئيسية 
              </label>
              <input
                onChange={handleSingleImageChange}
                name="image"
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                type="file"
              />
              {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-3" />}
            </div>

            {/* Multiple Images Upload */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                صور إضافية
              </label>
              <input
                onChange={handleMultipleImagesChange}
                name="images"
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                type="file"
                multiple
              />
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imagePreviews.map((image, index) => (
                  <img key={index} src={image} alt={`Uploaded ${index}`} className="w-full h-auto" />
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="mb-5">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                العلامة التجارية
              </label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">اختر العلامة</option>
                {
                  brands?.map((brand) => (
                    <option value={brand.name}>{brand.name}</option>
                  ))
                }
                {/* <option value="brada">Brada</option>
                <option value="shanel">Shanel</option>
                <option value="karamel">Karamel</option>
                <option value="loui vaton">Loui Vaton</option> */}
              </select>
            </div>

            {/* Product Price */}
            <div className="mb-5">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                السعر
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-5">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                الفئة
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">اختر الفئة</option>
                <option value="النساء">النساء</option>
                <option value="الرجال">الرجال</option>
                <option value="ساعات">ساعات</option>
                <option value="محافظ">محافظ</option>
                <option value="طواقي ونظارات">طواقي ونظارات</option>
                <option value="إكسسوارات وشالات">إكسسوارات وشالات</option>
                <option value="حقائب للمناسبات">حقائب للمناسبات</option>
              </select>
            </div>

            {/* Count in Stock */}
            <div className="mb-5">
              <label htmlFor="countInStock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                عدد القطع في المخزن
              </label>
              <input
                type="text"
                id="countInStock"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            {/* Discount */}
            <div className="mb-5">
              <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                نسبة الخصم
              </label>
              <input
                type="text"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            {/* Submit the form */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              تقديم النموذج
            </button>
          </form>
          {/* Form Area End */}
        </main>
      </div>
    </div>
  );
}
