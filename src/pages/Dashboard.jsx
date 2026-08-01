import { FaUsers, FaUserShield, FaCrown } from "react-icons/fa";
import StatCard from "../components/StatCard";
import { useGetUsers } from "../hooks/useUsers";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { data, isLoading, error } = useGetUsers();
  const users = data?.users;

  if (users?.role === "user") {
    return <Navigate to="/profile" replace />;
  }
  console.log(users);

  if (isLoading)   return <Spinner/>
  if (error) return <h1>Error...</h1>;

  const totalUsers = users.length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const totalSuperAdmins = users.filter(
    (user) => user.role === "superadmin",
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<FaUsers />}
          bgColor="bg-blue-600"
        />

        <StatCard
          title="Admins"
          value={totalAdmins}
          icon={<FaUserShield />}
          bgColor="bg-green-600"
        />

        <StatCard
          title="Super Admins"
          value={totalSuperAdmins}
          icon={<FaCrown />}
          bgColor="bg-purple-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
