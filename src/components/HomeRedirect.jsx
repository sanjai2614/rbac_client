import { Navigate } from "react-router-dom";
import { useGetProfile } from "../hooks/useUsers";
import Spinner from "./Spinner";

const HomeRedirect = () => {
  const { data, isLoading, isError } = useGetProfile();

  if (isLoading) return <Spinner />;

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  if (data.user.role === "user") {
    return <Navigate to="/profile" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default HomeRedirect;