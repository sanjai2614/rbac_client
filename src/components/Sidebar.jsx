import { NavLink } from "react-router-dom";
import { useGetProfile } from "../hooks/useUsers";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const activeClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 rounded bg-blue-500 text-white font-semibold"
      : "block px-4 py-2 rounded text-white hover:bg-slate-700";

  const { data } = useGetProfile();
  const currentUser = data?.user;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
  className={`
    fixed top-0 left-0 z-50
    h-screen w-64 bg-slate-800 p-5
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-8 lg:block">
          <h2 className="text-2xl font-bold text-white">
            {currentUser?.role === "superadmin" && "Super Admin"}
            {currentUser?.role === "admin" && "Admin"}
            {currentUser?.role === "user" && "User"}
          </h2>

          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav>
          <ul className="space-y-3">
            {currentUser?.role !== "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={activeClass}
                    onClick={() => setIsOpen(false)}
                  >
                    🏠 Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/users"
                    className={activeClass}
                    onClick={() => setIsOpen(false)}
                  >
                    👥 Users
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to="/profile"
                className={activeClass}
                onClick={() => setIsOpen(false)}
              >
                👤 Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={activeClass}
                onClick={() => setIsOpen(false)}
              >
                ⚙️ Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;