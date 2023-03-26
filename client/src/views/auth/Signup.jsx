import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserIcon } from "@heroicons/react/20/solid"
import { toast } from "react-toastify";
import axiosInstance from '../../axios';
import { useStateContext } from '../../Context/ContextProvider';

const Signup = () => {
    const { setCurrentUser, setUserToken } = useStateContext()
    const [userDetails, setUserDetails] = useState({firstname:'', lastname:'', email:'', phone:'', password:'', confirmPassword: ''})
    const navigate = useNavigate()

    const saveUser = async(e) => {
        e.preventDefault()
        if(userDetails.password !== userDetails.confirmPassword){
            toast.error("Please password Incorrect")
        }
        await axiosInstance.post('/sign-up', userDetails)
        .then((res) => {
            toast.success(res.data.message)
            setCurrentUser(res.data.data.user)
            setUserToken(res.data.data.accessToken)
            navigate('/dashboard')
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Have Account? {' '}
                <Link to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login
                </Link>
            </p>
            
            <form className="mt-8 space-y-6" onSubmit={saveUser}>
                {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                <div className="-space-y-px rounded-md shadow-sm">
                    <div className=''>
                        <label htmlFor="email-address" className="sr-only">
                            First Name
                        </label>
                        <input
                            type="text"
                            required
                            value={userDetails.firstname}
                            onChange={(e) => {setUserDetails({...userDetails, firstname:e.target.value})}}
                            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="First Name"
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="email-address" className="sr-only">
                            Last Name
                        </label>
                        <input
                            type="text"
                            autoComplete="email"
                            required
                            value={userDetails.lastname}
                            onChange={(e) => {setUserDetails({...userDetails, lastname:e.target.value})}}
                            className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={userDetails.email}
                            onChange={(e) => {setUserDetails({...userDetails, email:e.target.value})}}
                            className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Email address"
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="phone" className="sr-only">
                            Phone
                        </label>
                        <input
                            type="text"
                            required
                            value={userDetails.phone}
                            onChange={(e) => {setUserDetails({...userDetails, phone:e.target.value})}}
                            className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={userDetails.password}
                            onChange={(e) => {setUserDetails({...userDetails, password:e.target.value})}}
                            className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="password" className="sr-only">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            value={userDetails.confirmPassword}
                            onChange={(e) => {setUserDetails({...userDetails, confirmPassword:e.target.value})}}
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Confirm Password"
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

                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Sign up
                    </button>
                </div>
            </form>

        </>
    )
}

export default Signup