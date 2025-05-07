import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { FaQrcode } from "react-icons/fa";
import { IoNotificationsSharp, IoSettingsSharp, IoLogOut, IoChatbubbleEllipses } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { MdQrCode } from "react-icons/md"; // Added for the Most In and Out Stocks icon

const Layout = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [activeLinkName, setActiveLinkName] = useState("Dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // navigate('/signin'); // redirect to login if no token
    }
  }, []);

  const handleLinkClick = (index, path, name) => {
    setActiveLink(index);
    setActiveLinkName(name);
    navigate(path);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('user');       
    localStorage.removeItem('token');       
   
  };


  const SidebarLinks = [
    { id: 1, path: "/", name: "Dashboard", icon: RiDashboardFill },
    { id: 2, path: "/status&tasks", name: "Robot Status & Tasks", icon: FaTasks },
    { id: 3, path: "/inventory-management", name: "Inventory Management", icon: MdOutlineInventory },
    { id: 4, path: "/mostInOut", name: "Most In & Out Stocks", icon: BiTransfer },
    { id: 5, path: "/Qrpage", name: "QR Generating", icon: FaQrcode },
    { id: 6, path: "/addUser", name: "Add Users", icon: FaUserPlus },
    { id: 7, path: "/Reports_Analytics", name: "Reports & Analytics", icon: GrAnalytics },
    { id: 8, path: "/alerts&notifications", name: "Alerts & Notifications", icon: IoNotificationsSharp },
    { id: 9, path: "/settings&configuration", name: "Settings & Configuration", icon: IoSettingsSharp },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-16 md:w-72 fixed left-0 top-0 z-10 h-screen border border-[#667A8A] pt-6 px-4 bg-[#031C30]">
        {/* Logo */}
        <div className="flex mb-10">
          <img src="/vite.svg" alt="logo" className="w-10 hidden md:flex pr-4" />
          <img src="/vite.svg" alt="logo" className="w-8 flex md:hidden" />
          <h3 className="text-white font-medium hidden md:block text-xl">Warebot</h3>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6 space-y-2 cursor-pointer">
          {SidebarLinks.map((link, index) => (
            <li
              key={index}
              className={`text-white font-medium rounded-sm py-2 px-5 hover:bg-[#667A8A] ${activeLink === index ? "bg-[#667A8A]" : ""
                }`}
              onClick={() => handleLinkClick(index, link.path, link.name)}
            >
              <div className="flex justify-center md:justify-start items-center md:space-x-5">
                <span className="text-2xl">{link.icon()}</span>
                <span className="text-sm text-white hidden font-poppins md:flex">{link.name}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="text-white w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
          <p
            onClick={handleLogout}
            className="flex justify-center md:justify-start font-medium rounded-sm py-2 px-5 bg-[#667A8A]">
            <span>
              <IoLogOut className="text-2xl" />
            </span>
            <span className="text-sm text-white hidden md:flex px-4">Logout</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full ml-16 md:ml-72 relative min-h-screen">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage: "url('/images/Background.png')",
            filter: "brightness(0.9)",
          }}
        ></div>

        {/* Navbar */}
        <div className="w-full fixed top-0 z-20 bg-[#031C30] border-b border-t border-[#667A8A]">
          <div className="flex justify-between items-center p-5 px-6 text-white">
            {/* Left side - Active Link Name */}
            <h1 className="text-xl font-semibold">{activeLinkName}</h1>

            {/* Right side - QR Icon, Chat Icon & User Avatar */}
            <div className="flex items-center gap-4 mr-16 md:mr-72">
              <MdQrCode
                size={26}
                className="text-[#5FB3F6] cursor-pointer"
                onClick={() => handleLinkClick(-1, "/qr-tools", "QR Tools")}
              />
              <IoChatbubbleEllipses size={28} className="text-[#5FB3F6]" />
              <img src="/defaultProfilePic.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="pt-20 relative z-10"><Outlet /></div>
      </div>
    </div>
  );
};

export default Layout;