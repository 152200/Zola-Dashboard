
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components and pages
import Dashboard from './pages/Dashboard';
import UploadImage from './components/UploadImage';
import AddCategory from './components/AddCategory';
import Customers from './components/Customers';
import Orders from './components/Orders';

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return null;
}

// Define routes with the router
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/upload',
      element: <UploadImage />,
    },
    {
      path: '/category',
      element: <AddCategory />,
    },
    {
      path: '/customers',
      element: <Customers />,
    },
    {
      path: '/orders',
      element: <Orders />,
    
    },
  ],
  { basename: '/Zola-Dashboard' } 
);

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={
          <>
            <ScrollToTop /> {/* Add ScrollToTop here */}
          </>
        }
      />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;


