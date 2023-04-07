import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PlusIcon, CheckBadgeIcon, CreditCardIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import axiosInstance from '../../axios';

const BookingAwaitingAction = () => {
  const [bookings, setBookings] = useState([])

  const getBooking = async () => {
    await axiosInstance.get(`/bookings/all`)
      .then((res) => {
        console.log("bookings", res.data.data)
        setBookings(res.data.data)
      }).catch((err) => {
        console.log(err.response.data.message)
      })
  }

  useEffect(() => {
    getBooking()
  }, [])

  const columns = [
    {
      name: 'S/N',
      cell: (row, index) => (index + 1),
      selector: row => row._id,
      width: "65px"
    },
    {
      name: 'REF NO.',
      selector: row => row.ref_no,
      sortable: true,
      width: "150px"
    },
    {
      name: 'EMAIL',
      selector: row => row.user_id.email,
      sortable: true,
      width: "150px"
    },
    {
      name: 'CATEGORY',
      selector: row => row.category_id.category,
      sortable: true,
      width: "150px"
    },
    {
      name: 'PRICE',
      selector: row => row.category_id.price,
      sortable: true,
      width: "100px"
    },
    {
      name: 'STATUS',
      selector: row => row.book_status,
      sortable: true,
    },
    {
      name: 'ACTIONS',
      selector: row => row.year,
      width: "400px",
      cell: (row) =>
        <>
          <div className="container flex flex-row">

            <button type='button'
              onClick={() => { setOpen(true); setBookingToDelete(row) }}
              className="mx-1 relative flex justify-center rounded-md bg-green-900 py-2 px-3 text-sm font-semibold text-white 
                        hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <CheckBadgeIcon className='h-5 w-5' />
              </span>
              <span className='w-20'>Mark Paid</span>
            </button>

            <Link to={`/booking/edit/${row._id}`}
              className="mx-1 relative flex justify-center rounded-md bg-blue-500 py-2 px-3 text-sm font-semibold text-white 
                        hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <CreditCardIcon className='h-5 w-5 ' />
              </span>
              <span className='pl-1 w-7'>Pay</span>
            </Link>

            <Link to={`/booking/edit/${row._id}`}
              className="mx-1 relative flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white 
                        hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <PencilSquareIcon className='h-5 w-5 ' />
              </span>
            </Link>

            <button type='button'
              onClick={() => { setOpen(true); setBookingToDelete(row) }}
              className="mx-1 relative flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white 
                        hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <TrashIcon className='h-5 w-5 ' />
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
          data={bookings}
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