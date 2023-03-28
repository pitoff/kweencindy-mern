import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LockClosedIcon } from "@heroicons/react/20/solid"
import axiosInstance from '../../axios'
import { useStateContext } from '../../Context/ContextProvider'
import { toast } from "react-toastify";

const Login = () => {
    const { setCurrentUser, setUserToken } = useStateContext()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

    const [authCredentials, setAuthCredentials] = useState({ email: '', password: '' })

    const loginUser = async(e) => {
        e.preventDefault()
        await axiosInstance.post('/login', authCredentials)
        .then((res) => {
            console.log("login response", res.data.data.user)
            setCurrentUser(res.data.data.user)
            setUserToken(res.data.data.accessToken)
            navigate(from, {replace: true})
            // navigate('/dashboard')
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                No Account? {' '}
                <Link to="/sign-up"
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create Account
                </Link>
            </p>

            <form className="mt-8 space-y-6" onSubmit={loginUser}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">


                    <div className=''>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            required
                            value={authCredentials.email}
                            onChange={(e) => {setAuthCredentials({...authCredentials, email:e.target.value})}}
                            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Email address"
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={authCredentials.password}
                            onChange={(e) => {setAuthCredentials({...authCredentials, password:e.target.value})}}
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Sign in
                    </button>
                </div>
            </form>

        </>
    )
}

export default Login