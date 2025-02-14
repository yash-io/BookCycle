import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthDetails from "../store/auth-details";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const {logoutUser} = useAuthDetails();

  const handleLogout = async () =>{
    await logoutUser();
    navigate('/');
  }


  return (
    <nav className="bg-black p-4 border-b-2 border-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-widest transition-all duration-300 hover:scale-110">
          ᗷᗝᗝᛕᑕƳᑕᒪᗴ
        </h1>
        <div className="hidden md:flex space-x-10 text-white text-xl font-mono">
          <Link to="/" className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Home
          </Link>
          <Link to="/auth/login" className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Login
          </Link>
          <Link to="/auth/signup" className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Signup
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none text-2xl transition-all duration-800 hover:rotate-180">
            {!isOpen ? "☰" : "✕"}
          </button>
        </div>
      </div>

      {/* Mobile Menu with hidden fix */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-gray-900 p-4 rounded-b-lg transition-all duration-800 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/" onClick={toggleMenu} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
          Home
        </Link>
        <Link to="/auth/login" onClick={toggleMenu} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
          Login
        </Link>
        <Link to="/auth/signup" onClick={toggleMenu} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
          Signup
        </Link>
        <button onClick={handleLogout} className="block w-full text-white items-center text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
            <h2>Logout</h2>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
