import React from 'react'

const Confirm = ({isOpen, onConfirm, onCancel}) => {

    if (!isOpen) return;

  return (
    <div className=' fixed inset-0 flex items-start justify-center bg-black/40 bg-opacity-40'>
        <div className=' bg-white p-8 rounded shadow-lg text-center'>
            <h2 className=' text-xl font-bold mb-4'>
                Confirm Delete
            </h2>
    
            <p className=' mb-6'>Are you sure you want to delete this Product?</p>
    
            <div className=' flex justify-center space-x-4'>
                <button onClick={onConfirm} className=' px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'>
                    Delete
                </button>
    
                <button onClick={onCancel} className=' px-4 py-2 bg-green-300 rounded hover:bg-green-600 text-white'>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default Confirm