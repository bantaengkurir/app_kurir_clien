// import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage/index';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Shop from '../pages/Shop';
import DetailShop from '../pages/DetailShop';
import Checkout from '../pages/Checkout';
import OrderDetail from "../pages/OrderDetail";
import ProtectedRoute from '../store/ProtectedRouteCustomer';
import ProtectedRouteSeller from '../store/ProtectedRouteSeller';
import UpdateBilling from "../pages/Update";
import ListProduct from "../pages/ListProduct";
import UpdateProduct from "../pages/UpdateProduct";
import AddProduct from "../pages/Add";
import Invoice from "../pages/Invoice";
import Search from "../pages/Search";
import NotFound from "../pages/404";
import Payment from "../containers/payment";
import OrderHistory from "../containers/orderHistory";
import Kurir from "../containers/Tracking/CourierTracking";
import KurirLocation from "../containers/Courier/index";
import KurirLocationUpdate from "../containers/Courier/HandlerLocationCourier";
import Customer from "../containers/Tracking/OrderTracking";
import CourierInfromation from "../containers/CourierInformation";
import Chat from "../containers/Chat";
import Rating from '../containers/Rating';
// import Rating from "../containers/RatingModal";

// import Navbar from "./components/Navbar";

import HomePage1 from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";

import {  Navigate } from "react-router-dom";
import  useAuthStore  from "../store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
// import { Toaster } from "react-hot-toast";

const Index = () => {

const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  // const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const router = createBrowserRouter([
    {
      path: '/home',
      element: 
          <HomePage />
      
    },
    {
      path: "/",
      element: 
      authUser ? 
      <HomePage1 /> 
      : <Navigate to="/login" />
    },
    {
      path:"/signup",
       element:!authUser ? <SignUpPage /> : <Navigate to="/" />
    },
       { path:"/login",
         element:
          !authUser ? 
          <LoginPage /> 
          : <Navigate to="/" />
          },
       { path:"/settings", element:<SettingsPage />},
        {
          path:"/profile",
           element: authUser ? <ProfilePage /> : <Navigate to="/login" />},
     

      
    // {
    //   path: '/login',
    //   element: <Login />,
    //   errorElement: <NotFound />,
    // },
    
    // {
    //   path: '/register',
    //   element: <Register />,
    // },
    {
      path: '/cart',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Cart />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/shop',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Shop />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/kurir',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Kurir />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/kurirlocation',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <KurirLocation />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/kurirlocationupdate',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <KurirLocationUpdate />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/courierinformation/:id',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <CourierInfromation />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/customer',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Customer />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/payment',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Payment />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/orderhistories',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <OrderHistory />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/Chat/:id',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Chat />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/rating',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Rating />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/detail/:id',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <DetailShop />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/checkout',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <Checkout />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/orderdetail/:id',
      element: (
        // <ProtectedRoute allowedRole='customer' >
          <OrderDetail />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/update/:id',
      element: (
        <ProtectedRoute allowedRole='customer' >
          <UpdateBilling />
        </ProtectedRoute>
      ),
    },
    {
      path: '/listproduct',
      element: (
        // <ProtectedRouteSeller allowedRole='seller' >
          <ListProduct />
        // </ProtectedRouteSeller>
      ),
    },
    {
      path: '/updateproduct/:id',
      element: (
        // <ProtectedRouteSeller allowedRole='seller'>
          <UpdateProduct />
        // </ProtectedRouteSeller>
      ),
    },
    {
      path: '/addproduct',
      element: (
        // <ProtectedRouteSeller allowedRole='seller'>
          <AddProduct />
        // </ProtectedRouteSeller>
      ),
    },
    {
      path: '/invoice',
      element: (
        // <ProtectedRouteSeller allowedRole='seller'>
          <Invoice />
        // </ProtectedRouteSeller>
      ),
    },
    {
      path: '/searchproduct',
      element: (
        // <ProtectedRouteSeller allowedRole='customer' >
          <Search />
        // </ProtectedRouteSeller>
      ),
    },
    {
      path: '/notfound',
      element: (
          <NotFound />
      ),
    },
    {
      path: '*', 
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Index;
