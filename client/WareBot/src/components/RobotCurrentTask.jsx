import React from 'react';
import { FaTasks } from "react-icons/fa";

const RobotCurrentTask = ({ task }) => {
    return (
        <div>
            <div className="bg-black/40 rounded-3xl p-4 flex justify-between">
                <div>
                    <p className="text-sm text-gray-300">Current Task</p>
                    <p className="text-md font-bold text-white">{task || "No task"}</p>
                </div>
                <div className='flex items-center bg-blue-500 rounded-xl p-3'>
                    <FaTasks size={25} className='text-white' />
                </div>
            </div>
        </div>
    );
};

export default RobotCurrentTask;