import { GoHome } from "react-icons/go";
import { FaUserGraduate } from "react-icons/fa6";
import { GiTrophiesShelf } from "react-icons/gi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Link, Outlet, useLocation } from "react-router-dom";

interface HomeLayoutProps {
  admin: boolean;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ admin }) => {
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-bg w-[100vw] h-[100vh] flex flex-col">
      {/* Scrollable content area */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>

      {/* Mobile view tab navigation (fixed at the bottom) */}
      <div className="fixed bottom-8 w-full flex items-center justify-center">
        <div className="tab h-[10vh] w-[93vw] bg-primary rounded-3xl flex items-center justify-around">
          {/* Home Tab */}
          <Link
            to="/"
            className={`relative flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              isActive("/") ? "w-[140px] bg-red-800 shadow-lg" : "w-[60px]"
            }`}
          >
            <GoHome
              className="absolute left-3 text-secondary text-2xl"
              style={{ minWidth: "30px" }}
            />
            <p
              className={`ml-10 text-white whitespace-nowrap overflow-hidden transition-opacity duration-300 ${
                isActive("/") ? "opacity-100" : "opacity-0"
              }`}
            >
              Home
            </p>
          </Link>

          {/* Leaderboard Tab */}
          <Link
            to="/leaderboard"
            className={`relative flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              isActive("/leaderboard")
                ? "w-[140px] bg-red-800 shadow-lg"
                : "w-[60px]"
            }`}
          >
            <GiTrophiesShelf
              className="absolute left-3 text-secondary text-2xl"
              style={{ minWidth: "30px" }}
            />
            <p
              className={`ml-10 text-white whitespace-nowrap overflow-hidden transition-opacity duration-300 ${
                isActive("/leaderboard") ? "opacity-100" : "opacity-0"
              }`}
            >
              Leaderboard
            </p>
          </Link>

          {/* Profile Tab */}
          <Link
            to="/profile"
            className={`relative flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              isActive("/profile")
                ? "w-[140px] bg-red-800 shadow-lg"
                : "w-[60px]"
            }`}
          >
            <FaUserGraduate
              className="absolute left-3 text-secondary text-2xl"
              style={{ minWidth: "30px" }}
            />
            <p
              className={`ml-10 text-white whitespace-nowrap overflow-hidden transition-opacity duration-300 ${
                isActive("/profile") ? "opacity-100" : "opacity-0"
              }`}
            >
              Profile
            </p>
          </Link>

          {/* Admin Tab (only visible to admins) */}
          {admin && (
            <Link
              to="/admin"
              className={`relative flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                isActive("/admin")
                  ? "w-[140px] bg-red-800 shadow-lg"
                  : "w-[60px]"
              }`}
            >
              <MdOutlineAdminPanelSettings
                className="absolute left-3 text-secondary text-2xl"
                style={{ minWidth: "30px" }}
              />
              <p
                className={`ml-10 text-white whitespace-nowrap overflow-hidden transition-opacity duration-300 ${
                  isActive("/admin") ? "opacity-100" : "opacity-0"
                }`}
              >
                Admin
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
