import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'
import logo from "../assets/kweencindyLogo.png"

const AuthLayout = () => {
  const { userToken } = useStateContext()

  if(userToken) {
    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt={`${import.meta.env.VITE_APP_NAME}`}
            />

          </div>

          {/* yeild(content) */}
          <Outlet />

        </div>
      </div>
    </>
  )
}

export default AuthLayout