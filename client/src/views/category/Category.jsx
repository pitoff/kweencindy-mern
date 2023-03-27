import React from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { PlusIcon } from "@heroicons/react/20/solid"

const Category = () => {
    const columns = [
        {
            name: 'S/N',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'CATEGORY',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'DESCRIPTION',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'PRICE',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'ACTION',
            selector: row => row.year,
            sortable: true,
        },
    ];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    const tableDatas = {
        columns,
        data,
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
                    data={data}
                    // customStyles={customStyles}
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