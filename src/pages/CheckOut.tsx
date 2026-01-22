import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Link } from "react-router-dom"

function CheckOut() {
  const items = useSelector((state: RootState) => state.cart.items)

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">Checkout</h1>
      <Link to="/cart" className="text-blue-500">Back to Cart</Link>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="border p-4 rounded">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-2">
              <img src={item.product.images[0]} alt={item.product.title} className="w-15 h-15 border rounded" />
              <p>
                {item.product.title} - ₹{item.product.price} × {item.quantity}
              </p>
            </div>
          ))}

          <p className="mt-4 font-bold">Total: ₹{total}</p>

          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Place Order
          </button>
        </div>
      )}
    </div>
  )
}

export default CheckOut
