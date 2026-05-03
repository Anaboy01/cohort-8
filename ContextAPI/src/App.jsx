import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Products from './Components/Products'
import EditProduct from './Components/EditProduct'


const App = () => {
  return (
    <div className=' min-h-screen bg-gray-100'>
      <nav className=' bg-blue-600 p-4 mb-6'>
        <div className=' max-w-6xl mx-auto flex justify-between'>
          <Link to={'/'} className=' text-white text-xl font-bold'>Product App</Link>

          <Link to={'/add'} className=' bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-100'>Add Product</Link>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/edit/:id' element={<EditProduct/>}/>
      </Routes>
    </div>
  )
}

export default App