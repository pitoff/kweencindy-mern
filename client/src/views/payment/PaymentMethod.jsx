import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import axiosInstance from '../../axios';
import { PlusIcon } from "@heroicons/react/20/solid"
import { PencilSquareIcon, TrashIcon, ExclamationTriangleIcon, CreditCardIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useStateContext } from '../../Context/ContextProvider';
import { Dialog, Transition } from '@headlessui/react'
import { toast } from "react-toastify";

const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const { currentUser } = useStateContext()
  const user = JSON.parse(currentUser)
  const [paymentMethodToDelete, setPaymentMethodToDelete] = useState()

  const getPaymentMethods = async () => {
    await axiosInstance.get(`/payment-method`)
      .then((res) => {
        console.log("payment methods", res.data.data)
        setPaymentMethods(res.data.data)
      }).catch((err) => {
        console.log(err.response.data.message)
      })
  }

  const deletePaymentMethod = async (id) => {
    await axiosInstance.delete(`/payment-method/${id}`)
      .then((res) => {
        console.log("delete response", res)
        setPaymentMethods(paymentMethods.filter((method) => method._id !== id))
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
      })
  }

  const toggleActivate = async (id, status) => {
    console.log("toggle status", status)
    await axiosInstance.put(`/payment-method/toggle-activate/${id}`, {status})
      .then((res) => {
        console.log(res)
        getPaymentMethods()
        toast.success(res.data.message)
      }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)
      })
  }

  useEffect(() => {
    getPaymentMethods()
  }, [])

  const columns = [
    {
      name: 'S/N',
      cell: (row, index) => (index + 1),
      selector: row => row._id,
      width: "65px"
    },
    {
      name: 'BANK',
      selector: row => row.bank,
      sortable: true,
      width: "100px"
    },
    {
      name: 'ACC NUMBER',
      selector: row => row.acc_number,
      sortable: true,
      width: "120px"
    },
    {
      name: 'ACC NAME',
      selector: row => row.acc_name,
      sortable: true,
      width: "150px"
    },
    {
      name: 'ACTIONS',
      selector: row => row.year,
      width: "220px",
      cell: (row) =>
        <>
          <div className="container flex flex-row">

            {row.is_active == 0 &&
              <button type='button'
                onClick={() => { toggleActivate(row._id, 1) }}
                className="mx-1 relative flex justify-center rounded-md bg-green-900 py-2 px-3 text-sm font-semibold text-white 
                            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Activate
              </button>
            }

            {row.is_active == 1 &&
            <button type='button'
              onClick={() => { toggleActivate(row._id, 0) }}
              className="mx-1 relative flex justify-center rounded-md bg-orange-600 py-2 px-3 text-sm font-semibold text-white 
                            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Deactivate
            </button>
            }

            <Link to={`/payment-method/${row._id}`}
              className="mx-1 relative flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white 
                            hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <PencilSquareIcon className='h-5 w-5 ' />
              </span>
            </Link>

            <button type='button'
              onClick={() => { setOpen(true); setPaymentMethodToDelete(row) }}
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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Method</h1>
            </div>
          </header>
        </div>

        <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
          <p><em>List of payment methods</em></p>
        </div>

      </div>

      <div className="container mx-auto mt-8">

        <div className="flex flex-row grid justify-items-end">
          <Link
            to={"/payment-method/create"}
            className="group relative flex justify-center rounded-md bg-pink-500 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="relative inset-y-0 left-0 flex items-center">
              <PlusIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
            </span>
            Add Payment Method
          </Link>
        </div>

        <DataTable
          fixedHeader
          columns={columns}
          // selectableRows
          data={paymentMethods}
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
                          Delete Payment Method
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete payment method for {paymentMethodToDelete && paymentMethodToDelete.bank}
                            ? This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => { deletePaymentMethod(paymentMethodToDelete._id); setOpen(false) }}
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

export default PaymentMethod