import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserIcon } from "@heroicons/react/20/solid"
import { toast } from "react-toastify";
import axiosInstance from '../../axios';
import { ListBulletIcon, UserCircleIcon, PhotoIcon } from "@heroicons/react/20/solid"

const CreateCategory = () => {
    const [category, setCategory] = useState({name: '', description: '', price: ''})
    const navigate = useNavigate()
    const {categoryId} = useParams()
    // console.log("cat Id", categoryId)

    const saveCategory = async(e) => {
        e.preventDefault()
        // console.log("category to create", category)
        // let res = null
        if(categoryId){
            await axiosInstance.put(`/category/${categoryId}`, category)
            .then((res) => {
                console.log(res.data.data)
                toast.success(res.data.message)
                navigate('/category')
            }).catch((err) => {
                console.log(err)
                // toast.error(err.response.data.message)
            })
        }else{
            await axiosInstance.post('/category/create', category)
            .then((res) => {
                console.log(res.data.data)
                toast.success(res.data.message)
                navigate('/category')
            }).catch((err) => {
                console.log(err)
                // toast.error(err.response.data.message)
            })
        }
        
    }

    useEffect(() => {
        if(categoryId){
            axiosInstance.get(`/category/${categoryId}`)
            .then(({data}) => {
                setCategory({name:data.data.category, description:data.data.description, price:data.data.price})
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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Category</h1>
                        </div>
                    </header>
                </div>

                <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
                    <p><em>Create make up category</em></p>
                </div>

            </div>

            <div className="container mx-auto mt-8">

                <div className="flex flex-row grid justify-items-end">
                    <Link
                        to={"/category"}
                        className="group relative flex justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="relative inset-y-0 left-0 flex items-center">
                            <ListBulletIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                        </span>
                        Categories
                    </Link>
                </div>

                <form onSubmit={saveCategory}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">New make up category</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            required
                                            value={category.name}
                                            onChange={(e) => {setCategory({...category, name:e.target.value})}}
                                            id="first-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">#</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="price"
                                            required
                                            value={category.price}
                                            onChange={(e) => {setCategory({...category, price:e.target.value})}}
                                            id="price"
                                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                        
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            required
                                            value={category.description}
                                            onChange={(e) => {setCategory({...category, description:e.target.value})}}
                                            rows={2}
                                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this category.</p>
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

export default CreateCategory