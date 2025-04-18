import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import TextField from '../components/TextField';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/users/login', formData);

            // Save user and token using context
            login(res.data.user, res.data.token);

            // Show popup
            setShowSuccessPopup(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen font-sans">
            {/* Left Panel */}
            <div
                className="w-1/2 relative bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: "url('/images/warebotCover.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-6">
                        <p className="text-sm tracking-widest uppercase opacity-80 mb-2 pl-[200px]">
                            Inspired by the future:
                        </p>
                        <h1 className="text-4xl font-bold tracking-wider pl-[200px]">
                            WAREBOT
                        </h1>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 flex items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('/images/Background.png')]">
                <div className="bg-gradient-to-br from-black/90 to-indigo-950/30 backdrop-blur-sm p-10 rounded-xl w-full max-w-sm text-white shadow-xl">
                    {/* Icon Animation */}
                    <div className="flex justify-center mb-6">
                        <span className="bg-blue-500 rounded-full p-4 animate-pulse">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2a5.5 5.5 0 00-5.5 5.5V9h-.25A2.75 2.75 0 003.5 11.75v8.5A2.75 2.75 0 006.25 23h11.5A2.75 2.75 0 0020.5 20.25v-8.5A2.75 2.75 0 0017.75 9H17V7.5A5.5 5.5 0 0012 2zm-3 7V7.5a3 3 0 016 0V9h-6zm3 4a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold mb-2">Nice to see you!</h2>
                    <p className="text-sm mb-6 text-gray-300">
                        Enter your email and password to sign in
                    </p>

                    {error && (
                        <div className="text-red-400 text-sm mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            placeholder="Your password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#5653FE] to-[#8B5CF6] text-white rounded-xl font-medium hover:opacity-90 hover:scale-105 transform transition"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    {/* <p className="mt-6 text-sm text-gray-400">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-blue-400 hover:underline cursor-pointer">
                            Sign up
                        </Link>
                    </p> */}
                </div>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center shadow-xl w-1/3">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Login Successful!</h3>
                        <p className="text-gray-700">Welcome back! You will be redirected shortly.</p>
                    </div>
                </div>
            )}

            {/* Pulse Animation Style */}
            <style jsx="true">{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                .animate-pulse {
                    animation: pulse 1.5s infinite;
                }
            `}</style>
        </div>
    );
};

export default SignIn;
