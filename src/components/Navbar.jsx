import { FaAndroid } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">
        RBAC Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <FaAndroid className="text-2xl text-green-600" />
      </div>
    </nav>
  );
};

export default Navbar;