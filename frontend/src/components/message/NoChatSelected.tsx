import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'

const NoChatSelected = () => {
  return (
    <div className="flex items-center w-full h-full justify-center text-3xl">
    Welcome To Our Chat {" "}<FiMessageSquare className="ms-3"/>
  </div>
  )
}

export default NoChatSelected