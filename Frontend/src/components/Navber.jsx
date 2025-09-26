import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/logo1.png"
                alt="HabitTrakerPro logo"
                className="h-32 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <Link
                  to="/deshbord"
                  className="text-gray-700 font text-xl hover:text-blue-500"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-habit"
                  className="text-gray-700 font text-xl hover:text-blue-500"
                >
                  AddHabit
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 font text-xl hover:text-blue-500"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout(); // existing logout function call
                    navigate("/"); // redirect to home page
                  }}
                  className="text-red-700 font text-xl border rounded-full px-1 hover:bg-gray-400 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-700 font text-xl hover:text-blue-500"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="text-red-700 font text-xl hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-blue-700 font text-xl hover:text-gray-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>


          {/* Mobile Menu */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
          <Link to="/deshbord" className="block text-gray-700 hover:text-blue-600">
            Dashbord
          </Link>

          <Link
            to="/add-habit"
            className="block text-gray-700 hover:text-blue-600"
          >
            Add Habit
          </Link>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="block text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
             <Link to='/' className="block text-gray-700 hover:text-blue-600"> 
             Home
             </Link>

              <Link
                to="/login"
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="block text-gray-700 hover:text-blue-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
       
    </nav>
  );
};

export default Navbar;
