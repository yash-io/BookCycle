import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthDetails from "../store/auth-details";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user,fetchUser,logoutUser} = useAuthDetails();
  useEffect(()=>{
    fetchUser();
  },[])
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();


  const handleLogout = async () =>{
    await logoutUser();
    navigate('/');
  }


  return (
    <nav className="bg-gradient-to-r from-blue-900 via-gray-900 to-blue-950 p-4 border-b-2 border-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-widest transition-all duration-300 hover:scale-110">
          ᗷᗝᗝᛕᑕƳᑕᒪᗴ
        </h1>
        <div className="hidden md:flex space-x-10 text-white text-xl font-mono">
          {user && <Link to="/" className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Home
          </Link>
          }
          {!user && <Link to="/auth/login" className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Login
          </Link>
          }
          {!user && <Link to="/auth/signup" className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Signup
          </Link>
          }
          <button onClick={handleLogout} className="hover:text-gray-400 transition-all duration-300 hover:scale-105">
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none text-2xl transition-all duration-800 ease-in-out hover:rotate-180">
            {!isOpen ? "☰" : "✕"}
          </button>
        </div>
      </div>

      {/* only for mobile devices */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-blue-950 p-4 rounded-b-lg transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
        }`}
      >

      {user && 
        <Link to="/" onClick={toggleMenu} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
        Home
      </Link>
      }
        {!user &&
        <Link to="/auth/login" onClick={toggleMenu} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
        Login
      </Link>
      }
        {!user && <Link to="/auth/signup" onClick={toggleMenu} className="block text-white text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
          Signup
        </Link>
        }
        <button onClick={handleLogout} className="block w-full text-white items-center text-lg font-mono hover:text-gray-400 transition-all duration-300 p-2">
            <h2>Logout</h2>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
