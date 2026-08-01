import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useUpdateProfile } from "../hooks/useUsers";

const ProfileModal = ({ isOpen, setIsOpen, user }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const {mutate:updateProfile,isPending} =useUpdateProfile()

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    updateProfile(form,{
        
        onSuccess:(data)=>{
            setIsOpen(false);
        }
    })
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>

          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
  type="submit"
  disabled={isPending}
  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
>
  {isPending ? "Updating..." : "Update Profile"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
