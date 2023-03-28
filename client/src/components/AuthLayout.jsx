import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'

const AuthLayout = () => {
  const { currentUser, setCurrentUser, userToken, setUserToken} = useStateContext()

  if(userToken) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
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