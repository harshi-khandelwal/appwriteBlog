import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import Modal from '../Modal'

function LogoutBtn() {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const logoutHandler = () => {
    authservice.logOut().then(() => {
      dispatch(logout())
      setShowModal(true)

      setTimeout(() => {
        setShowModal(false)
      }, 2000)
    })
  }

  return (
    <>
      <button
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        Logout
      </button>

      {showModal && (
        <Modal
          message="You've been logged out."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default LogoutBtn
