import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './containers/Root/Root';
import About from './others/About us/About';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Addproduct from './components/Addproduct/Addproduct';
import Home from './components/Home/Home';
import Carlist from './others/Carlist/Carlist';
import AuthProvider from './components/AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Products from './others/Products/Products';
import Details from './others/Details/Details';
import Mycart from './others/Mycart/Mycart';
import UpdateData from './others/UpdateData/UpdateData';
import Errorpage from './components/Errorpage/Errorpage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Errorpage></Errorpage>,
    children:
      [
        {
          path: "/",
          element: <Home></Home>,
          
        },
        {
          path: "/about",
          element: <PrivateRoute><About></About></PrivateRoute>,
        },
        {
          path: "/signin",
          element: <SignIn></SignIn>,
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
        {
          path: "/addproduct",
          element: <PrivateRoute><Addproduct></Addproduct></PrivateRoute>,
        },
        {
          path: "/products",
          element: <PrivateRoute><Products></Products></PrivateRoute>,
          // loader:()=>fetch('https://cars-data-server-side.vercel.app/products')
        },
        {
          path: "/:id",
          element: <Carlist></Carlist>,
          loader: () => fetch('/products.json')
        },
        {
          path:'/details/:id',
          element:<PrivateRoute><Details></Details></PrivateRoute>,
          loader:()=>fetch('https://cars-data-server-side.vercel.app/products')
        },
        {
          path:'/mycart',
          element:<PrivateRoute><Mycart></Mycart></PrivateRoute>,
          loader:(params)=>fetch(`https://cars-data-server-side.vercel.app/details/${params._id}`)
        },
        {
          path:'/updatecart',
          element:<PrivateRoute><UpdateData></UpdateData></PrivateRoute>,
          
        }
        
      ]
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
