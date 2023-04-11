import React, { Fragment, useEffect, } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'
import axiosInstance from '../axios'

const navigation = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Users', to: '/users' },
  { name: 'Booking', to: '/booking' },
  { name: 'Category', to: '/category' },
  { name: 'Payment Method', to: '/payment-method' },
  { name: 'Gallery', to: '/gallery' },
]

const defaultUserNavigation = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Booking', to: '/booking' },
  { name: 'Gallery', to: '/gallery' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardLayout = () => {
  const { currentUser, setCurrentUser, userToken, setUserToken } = useStateContext()
  let user = ''
  if (currentUser) {
    user = JSON.parse(currentUser)
  }
  if (!userToken) {
    return <Navigate to={"/login"} />
  }

  const logout = (e) => {
    e.preventDefault()
    axiosInstance.post('/logout')
      .then(() => {
        setCurrentUser({})
        setUserToken(null)
      }).catch(() => {

      })
  }

  const verifyAuth = async () => {
    await axiosInstance.get('/verify-user')
      .then((res) => {
        // console.log("user data", res.data.data.user)
        setCurrentUser(res.data.data.user)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      {user.role == "admin" &&
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.to}
                              className={({ isActive }) => classNames(
                                isActive
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      }
                      {user.role == "default" &&
                        <div className="ml-10 flex items-baseline space-x-4">
                          {defaultUserNavigation.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.to}
                              className={({ isActive }) => classNames(
                                isActive
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                            <UserIcon className='w-8 h-8 bg-black/25 p-2 rounded-full text-white' />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                            <Menu.Item>

                              <a
                                href="#"
                                onClick={(e) => logout(e)}
                                className={'block px-4 py-2 text-sm text-gray-700'}
                              >
                                Sign out
                              </a>

                            </Menu.Item>

                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                {user.role == "admin" &&
                  <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) => classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                }
                {user.role == "default" &&
                  <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) => classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                }
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon className='w-8 h-8 bg-black/25 p-2 rounded-full text-white' />
                      {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.fullname}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    {/* <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                  </div>
                  <div className="mt-3 space-y-1 px-2">

                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(e) => logout(e)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </Disclosure.Button>

                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Outlet />

      </div>

      {/* footer section */}

      <footer>
          <div className="container-fluid flex flex-row justify-between px-1 py-1 mx-auto mt-10 space-y-8 bg-gray-500">
            <div className="mx-auto m-3 text-center text-white">
              Copyright &copy; 2022, All Rights Reserved
            </div>
          </div>
        </footer>

      {/* end footer section */}

    </>
  )
}

export default DashboardLayout