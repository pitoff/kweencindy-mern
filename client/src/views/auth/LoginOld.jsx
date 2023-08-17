import React from 'react'

const LoginOld = () => {
    return (
        <>
            <div className="flex min-h-full items-center justify-center sm:px-2 lg:px-8">
                <article className="br3 ba b--black-10 mv2 w-100 w-50-m w-25-m mw6 shadow-1 text-center">
                    <main className="pa black-100">
                        <h1 className="ba b--transparent f1 fw7 ph0 mh0"> Login </h1>

                        <p className="mt-2 text-center text-sm f1 fw4 text-gray-600">
                            No Account?{" "}
                            <Link
                                to="/sign-up"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Create Account
                            </Link>
                        </p>
                        <form className="mt-4 space-y-2" onSubmit={loginUser}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div className="br3 pa2">
                                    <label htmlFor="email-address" className="db fw6 lh-copy f6">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={authCredentials.email}
                                        onChange={(e) => {
                                            setAuthCredentials({
                                                ...authCredentials,
                                                email: e.target.value,
                                            });
                                        }}
                                        className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="br3 pa2">
                                    <label htmlFor="password" className="db fw6 lh-copy f6">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={authCredentials.password}
                                        onChange={(e) => {
                                            setAuthCredentials({
                                                ...authCredentials,
                                                password: e.target.value,
                                            });
                                        }}
                                        className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md bg-pink-500 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                    </main>
                </article>
            </div>
        </>
    )
}

export default LoginOld