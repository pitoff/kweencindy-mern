import React from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PlusIcon } from "@heroicons/react/20/solid"

const BookingAwaitingAction = () => {

    const columns = [
        {
            name: 'S/N',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'REFERENCE_NO',
            selector: row => row.ref,
            sortable: true,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'PRICE',
            selector: row => row.price,
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
            ref: 'BKC-1253',
            email: 'jane@gmail.com',
            price: '#30,000'
        },
        {
            id: 2,
            ref: 'BKC-7341',
            email: 'julie@gmail.com',
            price: '#40,000'
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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Booking Awaiting Action</h1>
            </div>
          </header>
        </div>

        <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
          <p><em>Act on a Booked session</em></p>
        </div>

      </div>

      <div className="container mx-auto mt-8">

        <div className="flex flex-row grid justify-items-end">
          <Link
            to={"/booking/create"}
            className="group relative flex justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="relative inset-y-0 left-0 flex items-center">
              <PlusIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
            </span>
            Create Booking
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

export default BookingAwaitingAction