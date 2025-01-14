import {
    createBrowserRouter,
    Navigate,
    
  } from "react-router-dom";

  import Home from '../pages/Home'
import Layout from "../pages/layouts/Layout";
import BookForm from "../pages/BookForm";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import Register from '../pages/Register';
import Login from "../pages/Login";

import { RouterProvider } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
  
 

  


 
  
  export default function Router() {
    let {authReady, user} = useContext(AuthContext);
    let isAuthenticated = !!user
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout/>,
        children: [
          {
              path: "",
              element: isAuthenticated ? <Home/> : <Navigate to="/login"/>
          },
          {
              path: "/create",
              element: isAuthenticated ? <BookForm/> : <Navigate to="/login"/>

            },
          {
            path: "/edit/:id",
            element: isAuthenticated ? <BookForm/> : <Navigate to="/login"/>
        },
          {
              path: "/search",
              element: isAuthenticated ? <Search/> : <Navigate to="/login"/>
          },
          {
            path: '/books/:id',
            element: isAuthenticated ? <BookDetail/> : <Navigate to="/login"/>
          },
          {
            path: '/register',
            element: !isAuthenticated ? <Register/> : <Navigate to="/"/>
          },
          {
            path: '/login',
            element: !isAuthenticated ? <Login/> : <Navigate to="/"/>
          }
        ]
      },
    ]);
    
    return (
      authReady && <RouterProvider router={router} />
    )
  }
  