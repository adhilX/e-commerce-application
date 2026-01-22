import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import type { RootState } from "../store/store"
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/slice/cartSlice"
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard"
import Pagination from "../components/Pagination"
import { Link } from "react-router-dom"

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)

  const ITEMS_PER_PAGE = 3
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const paginatedItems = items.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-3 gap-4 p-4">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <div key={item.product.id}>
              <ProductCard product={item.product} />

              <div className="flex items-center gap-2">
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch(decrementQuantity(item.product.id))
                  }
                >
                  -
                </p>

                <p>Quantity: {item.quantity}</p>

                <p
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch(incrementQuantity(item.product.id))
                  }
                >
                  +
                </p>
              </div>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => dispatch(removeFromCart(item.product.id))}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No products in cart</p>
        )}
      </div>

      {items.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {items.length > 0 && (
        <div className="flex justify-center mt-4">
          <Link
            to="/checkout"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
