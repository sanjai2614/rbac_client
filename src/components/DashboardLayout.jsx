import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-slate-800 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-40">
          <button
            className="text-2xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          <h2 className="font-semibold">RBAC Admin</h2>
        </header>

        {/* Desktop Navbar */}
        <div className="hidden lg:block fixed top-0 left-64 right-0 z-30">
          <Navbar />
        </div>

        {/* Content */}
        <main className="pt-20 lg:pt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;