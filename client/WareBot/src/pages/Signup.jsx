import React from 'react';
import TextField from '../components/TextField';

const SignUp = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left Panel */}
      <div
        className="md:w-1/2 w-full h-72 md:h-auto relative bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/warebotCover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4 md:px-6">
            <p className="text-sm tracking-widest uppercase opacity-80 mb-2 md:pl-[200px]">
              Inspired by the future:
            </p>
            <div className="text-3xl md:text-4xl font-bold tracking-wider md:pl-[200px]">
              WAREBOT
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-[url('/images/Background.png')] bg-cover bg-center">
        <div className="w-full max-w-md px-4 py-6 sm:px-6 md:px-8 lg:px-10 text-white overflow-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
            ADD USERS
          </h1>

          <div className="bg-gradient-to-br from-black/90 to-indigo-950/30 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
            {/* Icon Animation */}
            <div className="flex justify-center mb-6">
              <span className="bg-blue-500 rounded-full p-4 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.485 0 4.5 2.015 4.5 4.5S14.485 12 12 12 7.5 9.985 7.5 7.5 9.515 3 12 3zm0 9c2.32 0 7 1.165 7 3.5V18h-14v-2.5c0-2.335 4.68-3.5 7-3.5zM18 8h4m-2-2v4"
                  />
                </svg>
              </span>
            </div>

            <p className="text-sm text-center text-gray-300 mb-6">
              Enter User's Details and In the End Your Password to Add User
            </p>

            <form className="space-y-4">
              <TextField label="Name" placeholder="User's Full name" type="text" />
              <TextField label="Email" placeholder="User's email address" type="email" />
              <TextField label="Password" placeholder="User's password" type="password" />
              <TextField
                label="Admin Password"
                placeholder="Your Super Admin Password"
                type="password"
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#5653FE] to-[#8B5CF6] text-white rounded-xl font-medium hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-bounce {
            animation: bounce 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
