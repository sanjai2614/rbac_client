import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetProfile } from "../hooks/useUsers";
import Spinner from "./Spinner";

const PublicRoute = () => {
 const { data, isLoading, isError } = useGetProfile();

 console.log({ data, isLoading, isError });

if (isLoading) {
  return <Spinner />;
}

if (isError) {
  return <Outlet />;
}

if (data?.user) {
  return data.user.role === "superadmin"
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/profile" replace />;
}

return <Outlet />;
};

export default PublicRoute;