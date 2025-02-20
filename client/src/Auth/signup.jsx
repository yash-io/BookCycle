import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthDetails from "../store/auth-details";

const SignUpPage = () => {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const { user, createUser } = useAuthDetails();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const handleDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        const data = await createUser(details.email, details.name, details.password);
        if (data.success) {
            console.log(data.message);
            navigate("/");
        } else {
            console.log(data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 relative">
            {/* Neon Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-100 to-black opacity-30 blur-3xl"></div>

            {/* Glassmorphic Sign-Up Card */}
            <div className="relative sm:w-1/3 w-full mx-4 border border-gray-300 p-10 rounded-lg bg-white/10 backdrop-blur-lg shadow-xl">
                <h1 className="text-3xl text-white font-bold text-center mb-6">
                    Create Account
                </h1>

                {/* Name Input */}
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-white text-lg font-mono">
                        Username
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={details.name}
                        onChange={handleDetails}
                        className="w-full bg-white/20 backdrop-blur-md text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-white text-lg font-mono">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={details.email}
                        onChange={handleDetails}
                        className="w-full bg-white/20 backdrop-blur-md text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-white text-lg font-mono">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={details.password}
                        onChange={handleDetails}
                        className="w-full bg-white/20 backdrop-blur-md text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {/* Login Link */}
                <div className="flex justify-between text-white text-sm mb-6">
                    <p>Already have an account?</p>
                    <Link to="/auth/login" className="text-blue-400 hover:underline">
                        Login here
                    </Link>
                </div>

                {/* Sign-Up Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSignUp}
                        className="w-full px-5 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg transition transform hover:scale-105 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
