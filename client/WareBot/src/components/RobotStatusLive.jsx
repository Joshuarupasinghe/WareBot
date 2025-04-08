import React from 'react'
import { FaRoute } from "react-icons/fa6";

const RobotStatusLive = () => {
    return (
        <div>
            <div className="bg-black/40 rounded-xl p-5 flex justify-between">
                <div>
                    <p className="text-sm text-gray-300">Robot Status <span className='text-xs bg-red-700 rounded-lg px-2'>Live!</span></p>
                    <p className="text-lg font-bold text-white">On Route 12D</p>
                </div>
                <div className='flex items-center bg-blue-500 rounded-xl p-3'>
                    <FaRoute size={28} className='text-white' />
                </div>
            </div>
        </div>
    )
}

export default RobotStatusLive