import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useState } from "react";
import App from "../App";
import Home from "../home/home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import Uploadbook from "../dashboard/Uploadbook";
import ManageBook from "../dashboard/MangeBook";
import EditBook from "../dashboard/EditBook";
import SignUp from "../components/signUp";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/book/:id",
                element: <SingleBook />,
                loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
            }
        ]
    },
    {
        path: "/admin/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            },
            {
                path: "/admin/dashboard/upload",
                element: <Uploadbook />
            },
            {
                path: "/admin/dashboard/manage",
                element: <ManageBook />
            },
            {
                path: "/admin/dashboard/edit-books/:id",
                element: <EditBook />,
                loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
            }
        ]
    }, {
        path: "sign-up",
        element: <SignUp />
    }, {
        path: "login",
        element: <Login />
    }, {
        path: "logout",
        element: <Logout />
    }
]);

export default router;