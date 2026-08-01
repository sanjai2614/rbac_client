import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useUpdateUser } from "../hooks/useUsers";

const UserModal = ({ isOpen, setIsOpen, selectedUser, setSelectedUser,isProfile }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    } else {
      setForm({
        name: "",
        email: "",
        role: "user",
      });
    }
  }, [selectedUser]);

  const { mutate: updateUser } = useUpdateUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      id: selectedUser._id,
      payload: form,
    });
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Update User</h2>

          <button onClick={handleClose}>
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              placeholder="Enter name"
              onChange={handleChange}
              name="name"
              value={form.name}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
              value={form.email}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Role</label>

            <select
              onChange={handleChange}
              name="role"
              value={form.role}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {selectedUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
