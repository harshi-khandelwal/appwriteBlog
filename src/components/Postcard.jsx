import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-72 h-80 bg-gray-100 rounded-xl p-4 flex flex-col justify-between'>
        <div className='w-full h-48 flex justify-center items-center mb-4 overflow-hidden'>
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <h2 className='text-lg font-bold line-clamp-2'>{title}</h2>
      </div>
    </Link>
  )
}

export default Postcard