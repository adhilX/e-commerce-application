import { useEffect, useState } from "react"
import { getProducts, getCategories } from "../services/productServices"
import type { IProduct } from "../types/IProduct"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { addToCart } from "../store/slice/cartSlice"
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard"
import { toast } from "react-hot-toast"
import Pagination from "../components/Pagination"
import type ICategory from "../types/ICategory"
function Home() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }
    loadCategories()
  }, [])

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const loadProducts = async () => {
      const res = await getProducts({
        page,
        category: selectedCategory || undefined,
        search: debouncedSearch || undefined,
      })

      setProducts(res.data.products)

      const total = res.data.total
      const limit = res.data.limit
      setTotalPages(Math.ceil(total / limit))
    }

    loadProducts()
  }, [page, selectedCategory, debouncedSearch])

  function handleAddToCart(product: IProduct) {
    dispatch(addToCart(product))
    toast.success("Product added to cart")
  }

  return (
    <>
      <NavBar />

      <div className="container mx-auto p-4">
        {/* SEARCH */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setPage(1)
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p>No products found</p>
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

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  )
}

export default Home
