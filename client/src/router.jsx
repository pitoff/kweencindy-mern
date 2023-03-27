import React from "react";
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import Dashboard from "./views/Dashboard";
import Booking from "./views/booking/Booking";
import Category from "./views/category/Category";
import CreateCategory from "./views/category/CreateCategory";
import CreateBooking from "./views/booking/CreateBooking";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/sign-up',
                element: <Signup/>
            }
        ]
    },

    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/booking',
                element: <Booking />
            },
            {
                path: '/booking/create',
                element: <CreateBooking />
            },
            {
                path: '/category',
                element: <Category />
            },
            {
                path: '/category/create',
                element: <CreateCategory />
            }
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            
        ]
    },

])

export default router

