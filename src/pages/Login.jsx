import { useState } from "react";
import { useLogin,useResendVerification } from "../hooks/useAuth";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [showResend, setShowResend] = useState(false);

const { mutate: login, isPending } = useLogin({
  onError: (err) => {
    console.log(err.response?.data);

    if (err.response?.data?.isVerified === false) {
      setShowResend(true);
    }
  },
});

const { mutate: resendVerification, isPending: isResending } =
  useResendVerification();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

 const handleResend = () => {
  if (!form.email.trim()) {
  toast.error("Please enter your email first.");
  return;
}
  resendVerification(form.email);
};
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-5xl font-bold mb-5">RBAC Admin Panel</h1>

          <p className="text-lg text-blue-100 leading-8">
            Secure authentication with Role Based Access Control. Manage users,
            roles and permissions efficiently.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 text-center mb-8">Login to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}

            <div>
              <label className="font-medium">Email</label>

              <div className="relative mt-2">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Password</label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative mt-2">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full border rounded-lg py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}

            <button
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
            {showResend && (
  <button
    type="button"
    onClick={handleResend}
    disabled={isResending}
    className="w-full mt-3 text-blue-600 hover:underline"
  >
    {isResending
      ? "Sending..."
      : "Resend Verification Email"}
  </button>
)}
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
