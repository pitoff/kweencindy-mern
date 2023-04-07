import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import axiosInstance from '../../axios';
import { ListBulletIcon, UserCircleIcon, PhotoIcon } from "@heroicons/react/20/solid"

const CreatePaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState({bank: '', acc_number: '', acc_name: ''})
    const navigate = useNavigate()
    const {paymentMethodId} = useParams()
    // console.log("method Id", paymentMethodId)

    const savePaymentMethod = async(e) => {
        e.preventDefault()
        console.log("method to create", paymentMethod)
        if(paymentMethodId){
            await axiosInstance.put(`/payment-method/${paymentMethodId}`, paymentMethod)
            .then((res) => {
                console.log(res.data.data)
                toast.success(res.data.message)
                navigate('/payment-method')
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
        }else{
            await axiosInstance.post('/payment-method/create', paymentMethod)
            .then((res) => {
                console.log(res.data.data)
                toast.success(res.data.message)
                navigate('/payment-method')
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
        }
        
    }

    useEffect(() => {
        if(paymentMethodId){
            axiosInstance.get(`/payment-method/${paymentMethodId}`)
            .then(({data}) => {
              setPaymentMethod({bank:data.data.bank, acc_number:data.data.acc_number, acc_name:data.data.acc_name})
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
        }
    }, [])
    
  return (
    <>
            <div className="container-fluid flex flex-col md:flex-row">

                <div className='md:w-1/2'>
                    <header className="">
                        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Method</h1>
                        </div>
                    </header>
                </div>

                <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
                    <p><em>Create payment method</em></p>
                </div>

            </div>

            <div className="container mx-auto mt-8">

                <div className="flex flex-row grid justify-items-end">
                    <Link
                        to={"/payment-method"}
                        className="group relative flex justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="relative inset-y-0 left-0 flex items-center">
                            <ListBulletIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                        </span>
                        Payment methods
                    </Link>
                </div>

                <form onSubmit={savePaymentMethod}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">New payment method</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="bank" className="block text-sm font-medium leading-6 text-gray-900">
                                        Bank
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            required
                                            value={paymentMethod.bank}
                                            onChange={(e) => {setPaymentMethod({...paymentMethod, bank:e.target.value})}}
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
                                            required
                                            value={paymentMethod.acc_number}
                                            onChange={(e) => {setPaymentMethod({...paymentMethod, acc_number:e.target.value})}}
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
                                            required
                                            value={paymentMethod.acc_name}
                                            onChange={(e) => {setPaymentMethod({...paymentMethod, acc_name:e.target.value})}}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>


        </>
  )
}

export default CreatePaymentMethod