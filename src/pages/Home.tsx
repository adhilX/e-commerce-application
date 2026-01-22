import { useEffect, useState } from "react"
import { getProducts } from "../services/productServices"
import type { IProduct } from "../types/IProduct"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { addToCart } from "../store/slice/cartSlice"
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard"
import { toast } from "react-hot-toast"
import Pagination from "../components/Pagination"
function Home() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loadProducts = async () => {
      const productList = await getProducts({ page })
      setProducts(productList.data.products)
      setTotalPages(productList.data.totalPages)
    }
    loadProducts()
  }, [page])

  function handleAddToCart(product: IProduct) {
    dispatch(addToCart(product))
    toast.success("Product added to cart")
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <ProductCard product={product} />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}

export default Home
