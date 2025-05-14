import React from 'react';
import { FaTasks } from "react-icons/fa";

const RobotCurrentTask = ({ task }) => {
    return (
        <div>
            <div className="flex items-center justify-between px-4 py-[14px] rounded-2xl bg-black/40 shadow-md w-fit min-w-[360px] gap-4">
                <div>
                    <p className="text-sm text-gray-300">Current Task</p>
                    <p className="text-md font-bold text-white">{task || "No task"}</p>
                </div>
                <div className='w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl'>
                    <FaTasks size={25} className='text-white' />
                </div>
            </div>
        </div>
    );
};

export default RobotCurrentTask;