import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="flex justify-between bg-green-600 items-center p-4">
        <div className="flex items-center">
          <Link to="/"><h1>Logo</h1></Link>
        </div>
        <div className="flex items-center">
         <Link to="/cart"><button className="bg-blue-500 text-white px-4 py-2 rounded mt-2"> Cart</button></Link>
        </div>
    </div>
  )
}

export default NavBar