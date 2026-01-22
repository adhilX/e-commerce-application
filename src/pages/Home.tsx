import { useEffect, useState } from "react"
import { getProducts } from "../services/productServices"
import type { IProduct } from "../types/IProduct"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { addToCart } from "../store/slice/cartSlice"

function Home() {

    const [products, setProducts] = useState<IProduct[]>([])
    const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
     const loadProducts = async () => {
       const productList = await getProducts()
       console.log("resolved:", productList)
       setProducts(productList.data.products)
      }
      loadProducts()
      console.log('ddddddddddddddddddddddd')
}, [])
 
function handleAddToCart(product: IProduct) {
  dispatch(addToCart(product))
}
  return (
    <div className="container mx-auto p-4">   

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        products.map((product) => (
          <div className="mb-4" key={product.id}>
        
            <div className="border p-4 rounded mb-4">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img src={product.images[0]} alt={product.name} />
                <button onClick={() => handleAddToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">add to cart</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home