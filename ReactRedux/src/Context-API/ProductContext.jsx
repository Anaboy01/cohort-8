import axios from 'axios'
import React, { createContext, useContext } from 'react'
import useFetchProducts from '../hooks/useFetchProducts'
import useConfirm from '../hooks/useConfirm'

/**
 * ProductContext
 * --------------
 * Global state for the product CRUD app.
 *
 * Custom hooks in use:
 *   • useFetchProducts – owns the products array, loading flag, and error state
 *   • useConfirm      – owns the delete-confirmation dialog state
 *
 * CRUD operations (addProduct, editProduct, deleteProduct) live here so that
 * all components share the same in-memory list without prop-drilling.
 */

const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  // ── data & remote state ────────────────────────────────────────────────────
  const {
    products,
    setProducts,
    loading,
    error,
    refetch,
  } = useFetchProducts()

  // ── confirmation dialog state ──────────────────────────────────────────────
  const {
    pendingId: deleteId,
    isOpen: confirmOpen,
    requestConfirm: setDeleteId,
    cancelConfirm,
  } = useConfirm()

  // ── CRUD helpers ───────────────────────────────────────────────────────────

  const addProduct = async (product) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/products/add',
        product
      )
      const newProduct = response.data

      if (newProduct?.id) {
        setProducts((prev) => [...prev, newProduct])
      }
    } catch (err) {
      console.error('addProduct error:', err.message)
    }
  }

  const editProduct = async (product) => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${product.id}`,
        product
      )
      const updated = response.data

      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      )
    } catch (err) {
      console.error('editProduct error:', err.message)
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `https://dummyjson.com/products/${id}`
      )
      const deletedProduct = response.data

      if (deletedProduct.isDeleted) {
        setProducts((prev) => prev.filter((p) => p.id !== deletedProduct.id))
      }
    } catch (err) {
      console.error('deleteProduct error:', err.message)
    } finally {
      cancelConfirm()
    }
  }

  return (
    <ProductContext.Provider
      value={{
        // data
        products,
        loading,
        error,
        refetch,
        // confirm dialog
        deleteId,
        confirmOpen,
        setDeleteId,
        cancelConfirm,
        // operations
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)

export default ProductProvider