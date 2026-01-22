import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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