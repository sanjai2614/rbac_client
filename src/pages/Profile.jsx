import { useState } from "react";
import ProfileModal from "../modals/ProfileModal";
import { useGetProfile } from "../hooks/useUsers";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { data, isLoading, error } = useGetProfile();
  const user = data?.user;

  if (isLoading) return <Spinner />;
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-3">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>

          <p className="text-gray-500 capitalize">{user.role}</p>
        </div>

        {/* User Details */}
        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <div className="mt-1 border rounded-lg px-4 py-3 bg-gray-50">
              {user.name}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="mt-1 border rounded-lg px-4 py-3 bg-gray-50">
              {user.email}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <div className="mt-1 border rounded-lg px-4 py-3 bg-gray-50 capitalize">
              {user.role}
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
        <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      </div>
    </div>
  );
};

export default Profile;
