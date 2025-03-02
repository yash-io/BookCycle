import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthDetails from "../store/auth-details";

const Defaultpage = () => {
  const { user, fetchUser } = useAuthDetails();

  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    
  }, [user, fetchUser]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Bookcycle</h1>
        <p className="text-gray-600 mb-6">
          Bookcycle is your go-to platform for accessing a wide range of educational materials and resources. Whether you're looking for free or paid content, we have something for everyone.
        </p>
        <p className="text-gray-600 mb-6">
          Explore our extensive collection of books, PDFs, eBooks, and audiobooks. Join our community to share and discover valuable resources that can help you in your academic and professional journey.
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
        <p className="text-gray-600 mt-6">
          By creating an account, you can access exclusive content, track your progress, and connect with other learners. Join us today and start your learning journey with Bookcycle!
        </p>
      </div>
    </div>
  );
};

export default Defaultpage;