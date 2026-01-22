import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/cart",
    element: <Cart />,
  },{
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

function Routes() {
  return (
    <RouterProvider router={route} />
  )
}

export default Routes       