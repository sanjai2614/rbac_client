import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useRegister } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
      password: "",
    confirmPassword: "",
  });
    const [showPassword, setShowPassword] = useState(false);
      const [showConfirm, setShowConfirm] = useState(false);



  const { mutate: register, isPending } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    register(form);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-10">

        <div>
          <h1 className="text-5xl font-bold mb-5">
            RBAC Admin Panel
          </h1>

          <p className="text-lg text-blue-100 leading-8">
            Create your account and securely manage your
            application with Role Based Access Control.
          </p>
        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account 🚀
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Register to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="font-medium">
                Full Name
              </label>

              <div className="relative mt-2">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                  className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="font-medium">
                Email
              </label>

              <div className="relative mt-2">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                  className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                  className="w-full border rounded-lg py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="font-medium">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                  className="w-full border rounded-lg py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isPending
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;
