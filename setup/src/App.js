import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleCocktail from './pages/SingleCocktail'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
const Layout = () => {
  return(
    <div className="app font-fontStyle">
    <Navbar />
    <Outlet />
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [  
  {
    path: "/",
    element: <Home />,
  },
      {
        path: "/about",
        element: <About />,
      },
      
  {
    path: "/cocktail/:id",
    element: <SingleCocktail />,
  },
  {
    path: "*",
    element: <Error />,
  },
    ]
  },

]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
