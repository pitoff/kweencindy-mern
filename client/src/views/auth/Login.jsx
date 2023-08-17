import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import axiosInstance from "../../axios";
import { useStateContext } from "../../Context/ContextProvider";
import { toast } from "react-toastify";
import "tachyons";

const Login = () => {
  const { setCurrentUser, setUserToken } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [authCredentials, setAuthCredentials] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/login", authCredentials)
      .then((res) => {
        console.log("login response", res.data.data.user);
        setCurrentUser(res.data.data.user);
        setUserToken(res.data.data.accessToken);
        navigate(from, { replace: true });
        // navigate('/dashboard')
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={authCredentials.email}
                  onChange={(e) => {
                    setAuthCredentials({
                      ...authCredentials,
                      email: e.target.value,
                    });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={authCredentials.password}
                  onChange={(e) => {
                    setAuthCredentials({
                      ...authCredentials,
                      password: e.target.value,
                    });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Not Account?{' '}
            {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a> */}
            <Link
              to="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    </>
  );
};

export default Login;
