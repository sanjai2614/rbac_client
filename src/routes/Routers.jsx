import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/DashboardLayout";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import HomeRedirect from "../components/HomeRedirect";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import PublicRoute from "../components/PublicRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/verify-email/:token" element={<VerifyEmail/>}/>
      <Route path="/" element={<HomeRedirect/>}/>

<Route element={<PublicRoute/>}>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
</Route>

      {/* protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
