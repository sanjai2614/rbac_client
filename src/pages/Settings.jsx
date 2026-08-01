import { useState } from "react";
import { FaSignOutAlt, FaLock } from "react-icons/fa";
import { useGetProfile } from "../hooks/useUsers";
import { useLogout } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import ChangePasswordModal from "../modals/ChangePasswordModal";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useGetProfile();
  console.log(data);
  const user = data?.user;

  const { mutate: logout, isPending } = useLogout();

  if (isLoading) return <Spinner />;
  if (isPending) return <Spinner />;
  if (error) return <h1>{error.message}</h1>;

  const handleLogout = () => {
    if (window.confirm("Are u sure want to log out")) {
      logout();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Account */}
      <div className="bg-white rounded-xl shadow pl-6 py-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>

        <div className="space-y-3 text-sm lg:text-lg">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>

          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm lg:text-lg bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaLock />
          Change Password
        </button>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-xl shadow p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm lg:text-lg bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>

        <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Settings;
