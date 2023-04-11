import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PlusIcon } from "@heroicons/react/20/solid"
import { useStateContext } from '../../Context/ContextProvider';
import { CheckCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios';

const Booking = () => {
  const { currentUser } = useStateContext()
  const user = JSON.parse(currentUser)
  const [bookings, setBookings] = useState([])

  const confirmedBooking = async () => {
    await axiosInstance.get(`/bookings/confirmed-booking`)
      .then((res) => {
        console.log("my booking", res.data.data)
        setBookings(res.data.data)
      }).catch((err) => {
        console.log(err.response.data.message)
      })
  }

  useEffect(() => {
    confirmedBooking()
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
      name: 'DATE',
      selector: row => row.book_date,
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
      name: 'BOOKING STATUS',
      selector: row => row.book_status,
      sortable: true,
      width: "150px"
    },
    {
      name: 'PAYMENT STATUS',
      selector: row => row.payment_status,
      sortable: true,
      width: "150px"
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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Booking</h1>
            </div>
          </header>
        </div>

        <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
          <p><em>Booked and Accepted Dates</em></p>
        </div>

      </div>

      <div className="container mx-auto mt-8">

        <div className="flex flex-row justify-end">
          {user.role == "default" &&
            <>
              <Link
                to={`/my-booking/${user._id}`}
                className="group relative flex justify-center rounded-md bg-gray-600 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="relative inset-y-0 left-0 flex items-center">
                  <ListBulletIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                </span>
                My Booking
              </Link>
              <Link
                to={"/booking/create"}
                className="group relative flex justify-center rounded-md bg-pink-500 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="relative inset-y-0 left-0 flex items-center">
                  <PlusIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                </span>
                Create Booking
              </Link>
            </>
          }
          {user.role == "admin" &&
            <>
              <Link
                to={"/booking-awaiting-actions"}
                className="group relative flex justify-center rounded-md bg-gray-600 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="relative inset-y-0 left-0 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                </span>
                Accept Booking
              </Link>
              <Link
                to={"/booking/create"}
                className="group relative flex justify-center rounded-md bg-pink-500 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="relative inset-y-0 left-0 flex items-center">
                  <PlusIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                </span>
                Create Booking
              </Link>
            </>
          }
        </div>

        <DataTable
          fixedHeader
          columns={columns}
          // selectableRows
          data={bookings}
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

export default Booking