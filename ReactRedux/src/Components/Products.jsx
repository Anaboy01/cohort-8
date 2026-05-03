import React from 'react'
import { useProduct } from '../Context-API/ProductContext'
import { Link } from 'react-router-dom'
import Confirm from './Confirm'

/**
 * Products
 * --------
 * Lists all products fetched via context (which uses useFetchProducts internally).
 * Delete confirmation state comes from useConfirm (via context).
 */

const Products = () => {
  const {
    products,
    loading,
    error,
    deleteId,
    confirmOpen,
    setDeleteId,
    cancelConfirm,
    deleteProduct,
  } = useProduct()

  return (
    <div className='max-w-4xl mx-auto px-4'>
      <h2 className='text-2xl font-bold mb-6'>Product List</h2>

      {loading && <p className='text-center mb-4 text-blue-500'>Loading…</p>}

      {error && (
        <p className='text-center text-red-500 mb-4'>Error: {error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className='text-center text-gray-500'>No Products Found</p>
      )}

      <div className='space-y-4'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition'
          >
            {product.images?.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.title}
                className='h-48 w-full object-cover mb-4 rounded'
              />
            )}

            <h3 className='text-lg font-semibold mb-2'>{product.title}</h3>
            <p className='text-gray-600 text-sm mb-2'>{product.description}</p>
            <p className='text-lg font-bold mb-4'>{`$${product.price}`}</p>

            <div className='flex justify-between'>
              <Link
                to={`/edit/${product.id}`}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                Edit
              </Link>

              <button
                onClick={() => setDeleteId(product.id)}
                className='px-4 py-2 bg-rose-500 text-white rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* useConfirm drives this dialog via context */}
      <Confirm
        isOpen={confirmOpen}
        onConfirm={() => deleteProduct(deleteId)}
        onCancel={cancelConfirm}
      />
    </div>
  )
}

export default Products