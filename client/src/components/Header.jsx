import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Home, User, LogOut, Menu, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { authUser, logout } = useAuthStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">Livio</span>
                <p className="text-xs text-gray-500 -mt-1">Find Roommates</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <img
                    src={authUser.image || "/avatar.png"}
                    className="h-8 w-8 object-cover rounded-full border-2 border-gray-200"
                    alt="User image"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {authUser.name}
                    </p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-5 flex justify-center mr-3">
                        <User size={16} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">Profile</p>
                        <p className="text-xs text-gray-500">
                          Manage your account
                        </p>
                      </div>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="w-5 flex justify-center mr-3">
                        <LogOut size={16} className="-ml-1" />
                      </div>
                      <div className="flex flex-col text-left">
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs text-gray-500">
                          Log out of your account
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {authUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-6 flex justify-center mr-3">
                    <User size={18} />
                  </div>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="w-6 flex justify-center mr-3">
                    <LogOut size={18} className="-ml-1" />
                  </div>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
