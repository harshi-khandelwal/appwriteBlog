import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 bg-opacity-100 z-50 flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader
