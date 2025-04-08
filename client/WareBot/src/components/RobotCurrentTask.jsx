import React from 'react'
import { IoWallet } from "react-icons/io5";

const RobotCurrentTask = () => {
    return (
        <div>
            <div className="bg-black/40 rounded-xl p-5 flex justify-between">
                <div>
                    <p className="text-sm text-gray-300">Current Task</p>
                    <p className="text-lg font-bold text-white">Fetching</p>
                </div>
                <div className='flex items-center bg-blue-500 rounded-xl p-3'>
                    <IoWallet size={28} className='text-white' />
                </div>
            </div>
        </div>
    )
}

export default RobotCurrentTask