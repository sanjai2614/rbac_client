import { Link } from "react-router-dom";
import { useState } from "react";
import { useForgotPassword } from "../hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { mutate:forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    forgotPassword(email)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;