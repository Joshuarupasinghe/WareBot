import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { FaTruckLoading } from "react-icons/fa";
import { IoNotificationsSharp, IoSettingsSharp, IoLogOut, IoChatbubbleEllipses } from "react-icons/io5";

const Layout = ({ children }) => {
    const [activeLink, setActiveLink] = useState(0);
    const [activeLinkName, setActiveLinkName] = useState("Dashboard");
    const navigate = useNavigate();

    const handleLinkClick = (index, path, name) => {
        setActiveLink(index);
        setActiveLinkName(name);
        navigate(path);
    }

    const SidebarLinks = [
        { id: 1, path: "/", name: "Dashboard", icon: RiDashboardFill },
        { id: 2, path: "/status&tasks", name: "Robot Status & Tasks", icon: FaTasks },
        { id: 3, path: "/inventory-management", name: "Inventory Management", icon: MdOutlineInventory },
        { id: 4, path: "/order-processing", name: "Order Processing", icon: FaTruckLoading },
        { id: 5, path: "/warehouse-map", name: "Warehouse Map", icon: FaMapLocationDot },
        { id: 6, path: "/reports&analytics", name: "Reports & Analytics", icon: GrAnalytics },
        { id: 7, path: "/alerts&notifications", name: "Alerts & Notifications", icon: IoNotificationsSharp },
        { id: 8, path: "/settings&configuration", name: "Settings & Configuration", icon: IoSettingsSharp },
    ]

    return (
        <div className='flex'>
            <div className='w-16 md:w-72 fixed left-0 top-0 z-10 h-screen border border-[#667A8A] pt-8 px-4 bg-[#031C30]'>
                {/* Logo */}
                <div className='flex mb-12'>
                    <img src='/vite.svg' alt='logo' className='w-10 hidden md:flex pr-4' />
                    <img src='/vite.svg' alt='logo' className='w-8 flex md:hidden' />
                    <h3 className='text-white font-medium hidden md:block text-xl'>Warebot</h3>
                </div>

                {/* Sidebar Links */}
                <ul className='mt-6 space-y-3 cursor-pointer'>
                    {
                        SidebarLinks.map((link, index) => (
                            <li key={index} 
                                className={`text-white font-medium rounded-sm py-3 px-5 hover:bg-[#667A8A] ${activeLink === index ? 'bg-[#667A8A]' : ''}`}
                                onClick={() => handleLinkClick(index, link.path, link.name)}
                            >
                                <div className='flex justify-center md:justify-start items-center md:space-x-5'>
                                    <span className='text-2xl'>{link.icon()}</span>
                                    <span className='text-sm text-white hidden font-poppins md:flex'>{link.name}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <div className='text-white w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center'>
                    <p className='flex justify-center md:justify-start font-medium rounded-sm py-3 px-5 bg-[#667A8A]'>
                        <span><IoLogOut className='text-2xl' /></span>
                        <span className='text-sm text-white hidden md:flex px-4'>Logout</span>
                    </p>
                </div>
            </div>

            <div className='w-full ml-16 md:ml-72'>
                <div className='w-full fixed top-0 z-20 bg-[#031C30] border-b border-t border-[#667A8A]'>
                    <div className='flex justify-between items-center p-6 px-6 text-white'>
                        {/* Left side - Active Link Name */}
                        <h1 className="text-xl font-semibold">{activeLinkName}</h1>

                        {/* Right side - Chat Icon & User Avatar */}
                        <div className='flex items-center gap-4 mr-16 md:mr-72'>
                            <IoChatbubbleEllipses size={28} className='text-[#5FB3F6]'/>
                            <img src='/defaultProfilePic.jpg' alt='avatar' className='w-8 h-8 rounded-full'/>
                        </div>
                    </div>
                </div>

                <div className='pt-20'> {/* Add padding to account for the fixed Navbar */}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;