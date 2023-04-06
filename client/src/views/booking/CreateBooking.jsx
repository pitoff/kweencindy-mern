import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import axiosInstance from '../../axios';
import { ListBulletIcon, UserCircleIcon, PhotoIcon } from "@heroicons/react/20/solid"
import { useStateContext } from '../../Context/ContextProvider';

const CreateBooking = () => {
  const navigate = useNavigate()
  const {bookingId} = useParams()
  const { currentUser } = useStateContext()
  const user = JSON.parse(currentUser)
  const [booking, setBooking] = useState({ 
    userId: user._id,
    categoryId: '',
    price:'',
    description:'',
    location: '',
    state: '',
    town: '',
    address: '',
    bookDate: '',
    bookingId: '',
  })
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    await axiosInstance.get('/category')
      .then((res) => {
        // console.log(res.data.data)
        setCategories(res.data.data)
      }).catch((err) => {
        console.log(err.response.data.message)
      })
  }

  useEffect(() => {
    if(bookingId){
      axiosInstance.get(`/bookings/${bookingId}`)
      .then(({data}) => {
          console.log("edit booking", data)
          setBooking({
            categoryId:data.data.category_id._id,
            price:data.data.category_id.price,
            description:data.data.category_id.description,
            location:data.data.location,
            state:data.data.state,
            town:data.data.town,
            address:data.data.address,
            bookDate:data.data.book_date,
            bookingId:data.data._id
          })
      }).catch((err) => {
          console.log(err)
          toast.error(err.response.data.message)
      })
    }
    getCategories()
  }, [])

  const setSelectedCat = async (e) => {
    // console.log("cat", e)
    axiosInstance.get(`/category/${e}`)
      .then((res) => {
        console.log(res.data.data)
        setBooking({ ...booking, categoryId: e, price:res.data.data.price, description:res.data.data.description})
      }).catch((err) => {
        console.log(err)
      })
  }

  const saveBooking = (e) => {
    e.preventDefault()
    if(bookingId){
      console.log("booking details", booking)
      axiosInstance.put(`/bookings/${bookingId}`, booking)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        return navigate(`/my-booking/${user._id}`)
      }).catch((err) => {
        console.log(err)
      })
    }else{
      axiosInstance.post(`/bookings`, booking)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        return navigate(`/my-booking/${user._id}`)
      }).catch((err) => {
        console.log(err)
      })
    }
    
  }

  return (
    <>
      <div className="container-fluid flex flex-col md:flex-row">

        <div className='md:w-1/2'>
          <header className="">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Booking</h1>
            </div>
          </header>
        </div>

        <div className='px-6 md:pt-12 grid md:justify-items-end font-bold md:w-1/2'>
          <p><em>Create Booking</em></p>
        </div>

      </div>

      <div className="container mx-auto mt-8">

        <div className="flex flex-row justify-end">
          {user.role == "admin" &&

            <Link
              to={"/booking-awaiting-actions"}
              className="group relative flex justify-center rounded-md bg-gray-600 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <ListBulletIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
              </span>
              All Booking
            </Link>
          }
          {user.role == "default" &&

            <Link
              to={"/booking"}
              className="group relative flex justify-center rounded-md bg-gray-600 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="relative inset-y-0 left-0 flex items-center">
                <ListBulletIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
              </span>
              All Booking
            </Link>
          }
          <Link
            to={`/my-booking/${user._id}`}
            className="group relative flex justify-center rounded-md bg-pink-500 m-1 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="relative inset-y-0 left-0 flex items-center">
              <ListBulletIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
            </span>
            My Booking
          </Link>
        </div>

        <form onSubmit={saveBooking}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">{bookingId ? "Update booking" : "Book a makeup session"}</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      name=""
                      onChange={(e) => { setSelectedCat(e.target.value) }}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                      <option value={""}>Select Category</option>
                      {categories && categories.map((category) => (
                        <option key={category._id} value={category._id} selected={booking.categoryId == category._id}>{category.category}</option>
                      ))}
                    </select>
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
                      value={booking.price}
                      disabled
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
                      value={booking.description}
                      disabled
                      rows={2}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Location
                  </label>
                  <div className="mt-2">
                    <select
                      name=""
                      onChange={(e) => { setBooking({ ...booking, location: e.target.value }) }}
                      value={booking.location}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                      <option value={""}>Select Location</option>
                      <option value="personal">Personal</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                </div>

                {
                  booking.location && booking.location == 'personal' && (
                    <>
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          State
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            value={booking.state}
                            onChange={(e) => { setBooking({ ...booking, state: e.target.value }) }}
                            id="first-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Town
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            value={booking.town}
                            onChange={(e) => { setBooking({ ...booking, town: e.target.value }) }}
                            id="first-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            value={booking.address}
                            onChange={(e) => { setBooking({ ...booking, address: e.target.value }) }}
                            id="first-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </>
                  )
                }

                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      required
                      value={booking.bookDate}
                      onChange={(e) => { setBooking({ ...booking, bookDate: e.target.value }) }}
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


              </div>
            </div>

          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" onClick={() => setBooking({ categoryId: '', location: '', state: '', town: '', address: '', bookDate: '' })} className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {bookingId ? "Update" : "Save"}
            </button>
          </div>
        </form>

      </div>


    </>
  )
}

export default CreateBooking