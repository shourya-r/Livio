import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Home, User, LogOut, Menu, Users, Sparkles } from "lucide-react";
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
    <header className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300 shadow-lg transform group-hover:scale-105">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Livio
                </span>
                <p className="text-xs text-purple-600 font-medium -mt-1">
                  Find Roommates
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-sm"
                >
                  <img
                    src={authUser.image || "/avatar.png"}
                    className="h-10 w-10 object-cover rounded-full border-3 border-purple-300 shadow-md"
                    alt="User image"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-purple-900">
                      {authUser.name}
                    </p>
                    <p className="text-xs text-purple-600 font-medium">
                      View Profile
                    </p>
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 py-3 z-10 backdrop-blur-sm">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="w-6 flex justify-center mr-3">
                        <User size={18} className="text-purple-600" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold text-purple-900">Profile</p>
                        <p className="text-xs text-purple-600">
                          Manage your account
                        </p>
                      </div>
                    </Link>
                    <div className="border-t border-purple-200 my-2"></div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200"
                    >
                      <div className="w-6 flex justify-center mr-3">
                        <LogOut size={18} className="-ml-1 text-red-500" />
                      </div>
                      <div className="flex flex-col text-left">
                        <p className="font-bold text-red-700">Sign Out</p>
                        <p className="text-xs text-red-600">
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
                  className="text-purple-700 hover:text-purple-900 font-bold transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg transform hover:scale-105"
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
              className="p-3 rounded-xl hover:bg-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            >
              <Menu className="w-6 h-6 text-purple-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-purple-200 bg-gradient-to-b from-white to-purple-50">
          <div className="px-4 py-4 space-y-3">
            {authUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 rounded-xl text-base font-bold text-purple-900 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-7 flex justify-center mr-3">
                    <User size={20} className="text-purple-600" />
                  </div>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-base font-bold text-red-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 transition-all duration-200"
                >
                  <div className="w-7 flex justify-center mr-3">
                    <LogOut size={20} className="-ml-1 text-red-500" />
                  </div>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="block px-4 py-3 rounded-xl text-base font-bold text-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="block px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
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
