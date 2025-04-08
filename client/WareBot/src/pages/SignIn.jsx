import React from 'react';
import TextField from '../components/TextField';

const SignIn = () => {
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
                        <h1 className="text-4xl font-bold tracking-wider pl-[200px]">WAREBOT</h1>
                    </div>
                </div>
            </div>


            {/* Right Panel */}
            <div className="w-1/2 flex items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('/images/Background.png')]">
                <div className="bg-gradient-to-br from-black/90 to-indigo-950/30 backdrop-blur-sm p-10 rounded-xl w-full max-w-sm text-white shadow-xl">

                    <h2 className="text-2xl font-semibold mb-2">Nice to see you!</h2>


                    <p className="text-sm mb-6 text-gray-300">
                        Enter your email and password to sign in
                    </p>

                    <form className="space-y-4">
                        <TextField label="Email" placeholder="Your email address" type="email" />
                        <TextField label="Password" placeholder="Your password" type="password" />

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-[#5653FE] to-[#8B5CF6] text-white rounded-xl font-medium hover:opacity-90 transition"
                            >
                                Sign In
                            </button>

                        </div>
                    </form>

                    <p className="mt-6 text-sm text-gray-400">
                        Don’t have an account?{' '}
                        <span className="text-blue-400 hover:underline cursor-pointer">
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
