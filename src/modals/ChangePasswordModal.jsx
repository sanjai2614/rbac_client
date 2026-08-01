import { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useChangePassword } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: changePassword, isPending } = useChangePassword();

  if (isPending) return <Spinner />;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess:()=>{

          handleClose()
        }
      }
    );
  };

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg">
        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <button onClick={handleClose}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body */}

        <form className="p-5 space-y-5" onSubmit={handleSubmit}>
          {/* Current Password */}

          <div>
            <label className="font-medium">Current Password</label>

            <div className="relative mt-2">
    
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}

          <div>
            <label className="font-medium">New Password</label>

            <div className="relative mt-2">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-medium">Confirm Password</label>

            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-2">
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
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
