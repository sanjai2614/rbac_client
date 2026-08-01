import { useState } from "react";
import UserModal from "../modals/UserModal";
import { useDeleteUser, useGetProfile, useGetUsers } from "../hooks/useUsers";
import Spinner from "../components/Spinner";
import { FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data:user, isLoading, error} = useGetUsers();
  const {data:profile}=useGetProfile()
  const { mutate: deleteUser, isPending } = useDeleteUser();
  
  if (isLoading) return <Spinner/>

  console.log(profile.user)

  const currentUser=profile.user


  if (error) return <h2>{error.message}</h2>;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete")) {
      deleteUser(id);
    }
  };

  return (
    <div className="overflow-x-auto" >
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {user?.users.map((user) => (
            <tr key={user._id} className="border-t text-center">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsOpen(true);
                  }}
                  className="bg-yellow-500 px-3 py-2 rounded cursor-pointer text-white mr-2 hover:bg-yellow-600 active:bg-yellow-700 active:scale-98"
                >
                  <FaEdit/>
                </button>
                {currentUser?.role === "superadmin" && (
                  <button
                    disabled={isPending}
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 px-3 py-2 rounded cursor-pointer text-white hover:bg-red-600 active:bg-red-700 active:scale-98"
                  >
                    <FaTrash/>
                  </button>
                )}
                <UserModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

// {
//   "name": "Sanjai",
//   "email": "sanjai@gmail.com",
//   "password": "123456",
//   "role": "admin"
// }
