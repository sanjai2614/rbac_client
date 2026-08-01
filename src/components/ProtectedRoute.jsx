import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetProfile } from '../hooks/useUsers'
import Spinner from '../components/Spinner'

const ProtectedRoute = () => {
    const {isLoading,isError} =useGetProfile()

    if (isLoading) return <Spinner />;

if (isError) {
  return <Navigate to="/login" replace />;
}

return <Outlet />;

}

export default ProtectedRoute
