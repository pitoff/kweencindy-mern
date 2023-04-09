import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import { useParams, Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { CreditCardIcon, ArrowUpCircleIcon, BackwardIcon } from '@heroicons/react/24/solid';
import { LinkIcon } from '@heroicons/react/20/solid';
import { useStateContext } from '../../Context/ContextProvider';

const MakePayment = () => {
    const { bookingId } = useParams()
    const { currentUser } = useStateContext()
    const user = JSON.parse(currentUser)
    const [activeMethod, setActiveMethod] = useState({})
    const [booking, setBooking] = useState({})

    const getActivePaymentMethod = async () => {
        await axiosInstance.get(`/payment-method/active/${bookingId}`)
            .then((res) => {
                setActiveMethod(res.data.data.paymentMethod)
                setBooking(res.data.data.booking)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }
    useEffect(() => {
        getActivePaymentMethod()
    }, [])

    function copyAccount() {
        const accNum = document.querySelector('#acc_num');
        const copyBtn = document.querySelector('#hereText')
        copyBtn.textContent = 'Account number copied'
        accNum.select();
        document.execCommand('copy');
        setTimeout(() => {
            copyBtn.textContent = 'here'
        }, 1500)
    }

    console.log("booking and payment", { a: booking, b: activeMethod })

    return (
        <>
            <div className="container-fluid flex flex-col md:flex-row">

                <div className='md:w-1/2'>
                    <header className="">
                        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Make Payment</h1>
                        </div>
                    </header>
                </div>

                <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
                    <p><em>Pay for booked session</em></p>
                </div>

            </div>

            <div className="container mx-auto flex flex-col-reverse mt-5 md:flex-row">

                <div className='flex flex-col md:w-1/2 mx-6'>
                    <div className='flex justify-between items-center md:justify-items-start'>
                        <h4 className='text-2xl font-bold'>
                            Pay By Transfer
                        </h4>
                        <span>
                            <ArrowUpCircleIcon className='h-12 w-12 text-green-700' />
                        </span>
                    </div>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="bank" className="block text-sm font-medium leading-6 text-gray-900">
                                Bank
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={activeMethod.bank}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="acc-number" className="block text-sm font-medium leading-6 text-gray-900">
                                Account Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    readOnly
                                    id='acc_num'
                                    value={activeMethod.acc_number}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="acc-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Account Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={activeMethod.acc_name}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>

                    <div className='mt-5'>
                        Click <button type='button' onClick={copyAccount}
                            className='rounded-md bg-green-900 text-white py-1 px-1 font-semibold'> <span className='flex justify-between items-center mx-1'><LinkIcon className='h-4 w-4 mr-1' /> <span id='hereText'>here</span> </span> </button> to copy account Number
                    </div>

                </div>

                <div className='flex flex-col mt-5 md:mt-0 md:w-1/2 mx-6'>

                    <div className='flex justify-between items-center md:justify-items-start'>
                        <h4 className='text-2xl font-bold'>
                            Card Payment
                        </h4>
                        <span>
                            <CreditCardIcon className='h-12 w-12 text-green-700' />
                        </span>
                    </div>

                    <div>
                        Coming Soon!
                    </div>
                </div>
            </div>

            <div className="container mx-auto grid justify-items-end mt-5">
                <Link to={`/my-booking/${user._id}`}
                    className="mx-1 relative flex justify-between items-center rounded-md bg-gray-500 py-2 px-3 text-sm font-semibold text-white 
                            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <span className="relative inset-y-0 left-0 flex items-center">
                        <BackwardIcon className='h-5 w-5 ' />
                    </span>
                    My Bookings
                </Link>
            </div>

        </>
    )
}

export default MakePayment