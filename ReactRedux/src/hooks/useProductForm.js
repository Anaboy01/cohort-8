import { useState } from 'react'

/**
 * useProductForm
 * --------------
 * Manages the state for the product add/edit form.
 *
 * @param {object} initialValues – optional seed values (used when editing an existing product)
 *
 * Returns:
 *   formData           – current form field values
 *   handleChange       – onChange handler for scalar fields (title, description, price)
 *   handleImageChange  – onChange handler for a single entry inside the images array
 *   addImage           – appends an empty string to the images array
 *   removeImage        – removes the image at a given index
 *   setFormData        – direct setter, used to hydrate the form when editing
 *   resetForm          – resets the form back to the initial (empty) state
 */
const DEFAULT_FORM = {
  title: '',
  description: '',
  price: '',
  images: [],          // array of image-URL strings
}

const useProductForm = (initialValues = DEFAULT_FORM) => {
  const [formData, setFormData] = useState(initialValues)

  // For scalar fields (title, description, price)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Update a single URL inside the images array
  const handleImageChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.images]
      updated[index] = value
      return { ...prev, images: updated }
    })
  }

  // Append a blank URL slot
  const addImage = () =>
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }))

  // Remove the URL at `index`
  const removeImage = (index) =>
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))

  const resetForm = () => setFormData(DEFAULT_FORM)

  return {
    formData,
    handleChange,
    handleImageChange,
    addImage,
    removeImage,
    setFormData,
    resetForm,
  }
}

export default useProductForm
