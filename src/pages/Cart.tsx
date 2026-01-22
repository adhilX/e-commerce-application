import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard"
import { useDispatch } from "react-redux"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../store/slice/cartSlice"
import { Link } from "react-router-dom"

function Cart() {


    const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-3 gap-4 p-4">

                {items.length > 0? items.map(item=>{
                    return (
                        <div key={item.product.id}>
                            <ProductCard product={item.product} />
                            <div className="flex items-center gap-2">
                            <p className="text-sm cursor-pointer" onClick={() => dispatch(decrementQuantity(item.product.id))}>-</p>
                            <p className="text-sm">Quantity: {item.quantity}</p>
                            <p className="text-sm cursor-pointer" onClick={() => dispatch(incrementQuantity(item.product.id))}>+</p>
                            </div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => dispatch(removeFromCart(item.product.id))}>Remove</button>
                        </div>
                    )
                 
                }) : <p>No products in cart</p>}
            </div>

          {items.length > 0 && <div className="flex justify-center">
                <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded">Checkout</Link>
            </div>}
        </div>
    )
    }

export default Cart