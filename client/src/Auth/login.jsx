import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDetails } from "../store/auth-details";

const LoginPage = () => {
    const [details, setDetails] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { user, loginUser } = useAuthDetails();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const handleDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        const data = await loginUser(details.email, details.password);
        if (data.success) {
            console.log("Successfully logged in");
            navigate("/home");
        } else {
            console.log(data.message);
            window.alert(data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            {/* Background with neon effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-100 to-black opacity-50 blur-3xl"></div>

            {/* Login Card */}
            <div className="relative sm:w-1/3 w-full mx-4 border border-gray-300 p-12 rounded-lg bg-white/10 backdrop-blur-lg shadow-xl">
                <h1 className="text-3xl text-white font-bold text-center mb-6">
                    Welcome Back
                </h1>

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

                {/* Signup Link */}
                <div className="flex justify-between text-white text-sm mb-6">
                    <p>Don't have an account?</p>
                    <Link to="/auth/signup" className="text-blue-400 hover:underline">
                        Create one
                    </Link>
                </div>

                {/* Login Button */}
                <div className="flex justify-center">
                    <button
                        className="w-full px-5 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg transition transform hover:scale-105 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
