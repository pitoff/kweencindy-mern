import React, {useEffect} from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'
import axiosInstance from '../axios'

const RequireAuth = ({allowedRoles}) => {
    const { currentUser } = useStateContext()
    // console.log("user role", JSON.parse(currentUser))
    const user = JSON.parse(currentUser)
    const location = useLocation()
    
    return (
        user?.role?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : user
            ? <Navigate to="/unauthorized" state={{from: location}} replace/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth