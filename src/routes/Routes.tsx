import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const route = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
])

function Routes() {
  return (
    <RouterProvider router={route} />
  )
}

export default Routes       