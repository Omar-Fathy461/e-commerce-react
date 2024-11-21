import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.scss'
import 'animate.css';


// components
import RootLayout from "./components/RootLayout"
import ErrorPage from "./views/ErrorPage"
import Home from "./views/Home"
import About from "./views/About"
import Contact from "./views/Contact"
import SignUp from "./views/SignUp"
import ProductsLayout from "./components/ProductsLayout"
import Products from "./components/e-commerce/Products"
import ProductDetails from "./components/e-commerce/ProductDetails"
import ProductsList from "./components/e-commerce/ProductsList"
import LogIn from "./views/LogIn"
import Cart from "./views/Cart"
import Wishlist from "./views/Wishlist"
import CheachOut from "./components/e-commerce/CheachOut"


function App() {

  const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "sign",
        element: <SignUp />
      },
      {
        path: "login",
        element: <LogIn />
      },
      {
        path: "categories",
        element: <ProductsLayout />,
        children: [
          {
            path: "",
            element: <Products />
          },
          {
            path: "products/:categoryName",
            element: <ProductsList />
          },
          {
            path: "products/:categoryName/products/:id",
            element: <ProductDetails />
          },
        ]
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/checkout",
        element: <CheachOut />
      }
    ]
  }])
  return <RouterProvider router={router} />
}

export default App
