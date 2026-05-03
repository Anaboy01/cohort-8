import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * useFetchProducts
 * ----------------
 * Fetches a paginated list of products from the DummyJSON API on mount.
 *
 * Returns:
 *   products  – array of product objects
 *   loading   – boolean, true while the request is in-flight
 *   error     – string | null, holds the error message if the fetch fails
 *   refetch   – function to manually re-trigger the fetch
 */
const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        'https://dummyjson.com/products?limit=10&skip=10&select=id,title,price,description,images'
      )

      if (response?.data?.products?.length) {
        setProducts(response.data.products)
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, setProducts, loading, error, refetch: fetchProducts }
}

export default useFetchProducts
