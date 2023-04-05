import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import axiosInstance from '../../axios';
import { PlusIcon } from "@heroicons/react/20/solid"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Category = () => {
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        await axiosInstance.get('/category')
            .then((res) => {
                console.log(res.data.data)
                setCategories(res.data.data)
            }).catch((err) => {
                console.log(err.response.data.message)
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    const removeCategory = async(id) => {
        console.log("cat id", id)
        await axiosInstance.delete(`/category/${id}`)
        .then((res) => {
            getCategories()
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const columns = [
        {
            name: 'S/N',
            cell: (row, index) => (index + 1),
            selector: row => row._id,
            width: "65px"
        },
        {
            name: 'CATEGORY',
            selector: row => row.category,
            sortable: true,
            width: "150px"
        },
        {
            name: 'DESCRIPTION',
            selector: row => row.description,
            sortable: true,
            width: "350px"
        },
        {
            name: 'PRICE',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'ACTION',
            selector: row => row.year,
            cell: (row) =>
                <>
                    <div className="container flex flex-row">
                        
                        <Link to={`/category/create/${row._id}`} 
                            className="mx-1 relative flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white 
                            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        > 
                        <span className="relative inset-y-0 left-0 flex items-center">
                            <PencilSquareIcon className='h-5 w-5 '/>
                        </span>
                        </Link>

                        <button 
                            type='button' 
                            onClick={() => removeCategory(row._id)}
                            className="mx-1 relative flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white 
                            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        > 
                        <span className="relative inset-y-0 left-0 flex items-center">
                            <TrashIcon className='h-5 w-5 '/>
                        </span>
                        </button>
                        

                    </div>
                    
                </>

        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '14px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    return (
        <>

            <div className="container-fluid flex flex-col md:flex-row">

                <div className='md:w-1/2'>
                    <header className="">
                        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
                        </div>
                    </header>
                </div>

                <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
                    <p><em>List of all categories</em></p>
                </div>

            </div>

            <div className="container mx-auto mt-8">

                <div className="flex flex-row grid justify-items-end">
                    <Link
                        to={"/category/create"}
                        className="group relative flex justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="relative inset-y-0 left-0 flex items-center">
                            <PlusIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                        </span>
                        Add Category
                    </Link>
                </div>

                <DataTable
                    fixedHeader
                    columns={columns}
                    // selectableRows
                    data={categories}
                    customStyles={customStyles}
                    persistTableHead
                    defaultSortField="id"
                    defaultSortAsc={false}
                    striped={true}
                    center={true}
                    highlightOnHover
                />

            </div>

        </>
    )
}

export default Category