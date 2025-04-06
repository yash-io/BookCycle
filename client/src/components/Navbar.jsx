import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthDetails from "../store/auth-details";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu Toggle
  const [isDesktopOpen, setIsDesktopOpen] = useState(false); // Desktop Sidebar Toggle
  const { user, fetchUser, logoutUser } = useAuthDetails();

  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-gray-900 to-blue-950 p-4 border-b-2 border-white sticky  top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-widest transition-all duration-300 hover:scale-110">
        𝔹𝕠𝕠𝕜𝕤𝕙𝕒𝕣𝕖
        </h1>

        {/* Desktop Toggle Button */}
          <div className="hidden md:flex">
            <button
              onClick={() => setIsDesktopOpen(!isDesktopOpen)}
              className="text-white text-xl font-mono hover:text-gray-400 transition-all duration-300 hover:scale-105"
            >
              Menu {!isDesktopOpen ? "☰" : "✕"}
            </button>
          </div>


        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl transition-all duration-800 ease-in-out hover:rotate-180"
          >
            {!isOpen ? "☰" : "✕"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden relative z-50 top-16 left-0 w-full bg-blue-950 p-4 rounded-b-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          }`}
        >
          {user ? (
            <>
              <Link to="/home" onClick={() => setIsOpen(false)} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
                Home
              </Link>
              <Link to="/free-materials" onClick={() => setIsOpen(false)} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
                Material-Hub
              </Link>
              <Link to="/post-material" onClick={() => setIsOpen(false)} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
                Upload Materials
              </Link>
              <button onClick={handleLogout} className="block w-full text-left text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" onClick={() => setIsOpen(false)} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
                Login
              </Link>
              <Link to="/auth/signup" onClick={() => setIsOpen(false)} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Desktop Sidebar Menu */}
      <div
        className={`fixed right-0 top-0 h-full bg-blue-700 text-white text-xl font-mono w-64 p-6 transition-transform duration-300 shadow-lg ${
          isDesktopOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsDesktopOpen(false)}
          className="absolute top-4 left-4 text-white text-2xl hover:text-gray-400 transition-all"
        >
          ✕
        </button>

        <nav className="mt-12">
          {user ? (
            <>
              <Link to="/home" onClick={() => setIsDesktopOpen(false)} className="block hover:text-gray-400 transition-all duration-300 p-2">
                Home
              </Link>
              <Link to="/free-materials" onClick={() => setIsDesktopOpen(false)} className="block hover:text-gray-400 transition-all duration-300 p-2">
                Material-Hub
              </Link>
              <Link to="/post-material" onClick={() => setIsDesktopOpen(false)} className="block hover:text-gray-400 transition-all duration-300 p-2">
                Upload Materials
              </Link>
              <button onClick={handleLogout} className="block w-full text-left hover:text-gray-400 transition-all duration-300 p-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" onClick={() => setIsDesktopOpen(false)} className="block hover:text-gray-400 transition-all duration-300 p-2">
                Login
              </Link>
              <Link to="/auth/signup" onClick={() => setIsDesktopOpen(false)} className="block hover:text-gray-400 transition-all duration-300 p-2">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
