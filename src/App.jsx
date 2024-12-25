// import React, { useEffect } from 'react';
// import {Routes, Route, useLocation, createBrowserRouter, RouterProvider} from 'react-router-dom';
// import './css/style.css';
// import './charts/ChartjsConfig';
// // Import pages
// import Dashboard from './pages/Dashboard';
// import UploadImage from './components/UploadImage';
// import AddCategory from './components/AddCategory';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Customers from './components/Customers'
// import Orders from './components/Orders'




// function App() {

//   const location = useLocation();

//   useEffect(() => {
//     document.querySelector('html').style.scrollBehavior = 'auto'
//     window.scroll({ top: 0 })
//     document.querySelector('html').style.scrollBehavior = ''
//   }, [location.pathname]); // triggered on route change

//   return (
//     <>
//       <Routes>
//         <Route exact path="/" element={<Dashboard />} />
//         <Route exact path="/upload" element={<UploadImage />} />
//         <Route exact path="/category" element={<AddCategory />} />
//         <Route exact path="/customers" element={<Customers />} />
//         <Route exact path="/orders" element={<Orders />} />
       
//       </Routes>
//       <ToastContainer position="top-center" />
//     </>
//   );
// }


// export default App;


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


