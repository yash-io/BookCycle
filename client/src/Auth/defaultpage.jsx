import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuthDetails from "../store/auth-details";

const Defaultpage = () => {
  const { user, fetchUser } = useAuthDetails();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Prevent redirection before fetching user

  // Fetch user session on mount
  useEffect(() => {
    const checkUser = async () => {
      await fetchUser();
      setLoading(false); // Ensure user is fetched before checking navigation
    };
    checkUser();
  }, []);

  // Redirect if user exists
  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]); // Ensure navigation only runs after loading

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Bookcycle</h1>
        <p className="text-gray-600 mb-6">
          Bookcycle is your go-to platform for accessing a wide range of educational materials and resources.
        </p>
        <button
          onClick={() => navigate("/auth/login")}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
        >
          Log In
        </button>
        <p className="text-gray-600 mb-4">Don't have an account?</p>
        <button
          onClick={() => navigate("/auth/signup")}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default Defaultpage;