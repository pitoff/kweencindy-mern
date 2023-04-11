import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PlusIcon, CheckBadgeIcon, ExclamationTriangleIcon, PencilSquareIcon, EyeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid"
import axiosInstance from '../../axios';
import { Dialog, Transition } from '@headlessui/react'
import { toast } from "react-toastify";

const BookingAwaitingAction = () => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [bookings, setBookings] = useState([])
  const [bookingToDelete, setBookingToDelete] = useState()

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

  const deleteBooking = async (id) => {
    await axiosInstance.delete(`/bookings/${id}`)
      .then((res) => {
        console.log("delete response", res)
        setBookings(bookings.filter((booking) => booking._id !== id))
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
      })
  }

  const acceptBooking = async (id) => {
    await axiosInstance.put(`/bookings/accept/${id}`)
      .then((res) => {
        console.log(res)
        getBooking()
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
        toast.success(err.response.data.message)
      })
  }
  //NB Implement IO for when booking is accepted it should reflect on my bookings without page refresh
  const declineBooking = async (id) => {
    await axiosInstance.put(`/bookings/decline/${id}`)
      .then((res) => {
        console.log(res)
        getBooking()
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
        toast.success(err.response.data.message)
      })
  }

  const markPaymentAsReceived = async (id) => {
    await axiosInstance.put(`/payment/mark-payment-as-received/${id}`)
      .then((res) => {
        console.log(res)
        getBooking()
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
        toast.success(err.response.data.message)
      })
  }

  const markPaymentAsNotReceived = async(id) => {
    await axiosInstance.put(`/payment/mark-payment-as-not-received/${id}`)
      .then((res) => {
        console.log(res)
        getBooking()
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
        toast.success(err.response.data.message)
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
      name: 'ACCEPT/DECLINE',
      selector: row => row.year,
      width: "130px",
      cell: (row) =>
        <>
          <div className="container flex flex-row">

            {(row.book_status == "pending booking" || row.book_status == "booking declined") &&
              <button type='button'
                onClick={() => { acceptBooking(row._id) }}
                className="mx-1 relative flex justify-center rounded-md bg-green-900 py-2 px-3 text-sm font-semibold text-white 
                hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="relative inset-y-0 left-0 flex items-center">
                  <CheckBadgeIcon className='h-5 w-5' />
                </span>
                <span className=''>Accept</span>
              </button>
            }

            {row.book_status == "booking accepted" &&
              <button type='button'
                onClick={() => { declineBooking(row._id) }}
                className="mx-1 relative flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white 
                hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="relative inset-y-0 left-0 flex items-center">
                  <XMarkIcon className='h-5 w-5' />
                </span>
                <span className=''>Decline</span>
              </button>
            }

          </div>
        </>
    },
    {
      name: 'PAYMENT',
      selector: row => row.year,
      width: "310px",
      cell: (row) =>
        <>
          <div className="container flex flex-row">

            {row.payment_status == "pending payment" && <div className='mx-auto'>Awaiting payment</div>}

            {(row.payment_status == "awaiting confirmation") || (row.payment_status == "payment confirmed") ?
              <>
                <button type='button'
                  onClick={() => markPaymentAsReceived(row._id)}
                  className="mx-1 relative flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white 
                  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className="relative inset-y-0 left-0 flex items-center">
                    <CheckBadgeIcon className='h-5 w-5' />
                  </span>
                  <span className='w-24'>Mark Received</span>
                </button>

                <button type='button'
                  onClick={() => markPaymentAsNotReceived(row._id)}
                  className="mx-1 relative flex justify-center rounded-md bg-orange-600 py-2 px-3 text-sm font-semibold text-white 
                  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className="relative inset-y-0 left-0 flex items-center">
                    <XMarkIcon className='h-5 w-5' />
                  </span>
                  <span className='w-26'>Not Received</span>
                </button>
              </> : ''
            }

          </div>
        </>
    },
    {
      name: 'ACTIONS',
      selector: row => row.year,
      width: "250px",
      cell: (row) =>
        <>
          <div className="container flex flex-row">

            <Link to={`/booking/edit/${row._id}`}
              className="mx-1 relative flex justify-center rounded-md bg-blue-500 py-2 px-3 text-sm font-semibold text-white 
                        hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <EyeIcon className='h-5 w-5 ' />
              </span>
              <span className='pl-1 w-10'>View</span>
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
          customStyles={customStyles}
          persistTableHead
          defaultSortField="id"
          defaultSortAsc={false}
          striped={true}
          center={true}
          highlightOnHover
        />

      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Delete booking
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete booking for {bookingToDelete && bookingToDelete.book_date}? This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => { deleteBooking(bookingToDelete._id); setOpen(false) }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  )
}

export default BookingAwaitingAction