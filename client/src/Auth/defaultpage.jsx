import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuthDetails from "../store/auth-details";

const Defaultpage = () => {
  const { user, fetchUser } = useAuthDetails();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await fetchUser();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  if (loading) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <svg
        className="animate-spin h-10 w-10 text-blue-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-white text-center text-lg font-medium max-w-xs">
        Checking your previous session login, please wait...
      </p>
    </div>
  );
}


  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500">Error: {error.message || "Failed to load"}</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
    <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Welcome to Bookcycle</h1>
      <p className="text-gray-700 mb-8 leading-relaxed">
        Bookcycle is your go-to platform for accessing a wide range of educational materials and resources.
      </p>
      <button
        onClick={() => navigate("/auth/login")}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300 mb-6"
      >
        Log In
      </button>
      <p className="text-gray-600 mb-4 font-medium">Don't have an account?</p>
      <button
        onClick={() => navigate("/auth/signup")}
        className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300"
      >
        Create an Account
      </button>
    </div>
  </div>
);
};

export default Defaultpage;
