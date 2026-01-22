import type { IProduct } from '../types/IProduct'

function ProductCard({product}: {product: IProduct}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h2 className='text-lg font-semibold'>{product.title}</h2>
      <img src={product.images[0]} alt={product.title} />
      <p className='text-sm text-gray-600'>{product.description}</p>
      <p className='text-lg font-bold'>{product.price} ₹</p>
    </div>
  )
}

export default ProductCard