import React, { useEffect, useState } from 'react';
import { FaTasks } from "react-icons/fa";

const RobotCurrentTask = ({ deviceId }) => {
    const [task, setTask] = useState("Loading...");

    useEffect(() => {
        const fetchCurrentTask = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/robot/${deviceId}/task`);
                const data = await res.json();
                if (res.ok) {
                    setTask(data.task || "No task");
                } else {
                    setTask("Error");
                    console.error(data.message || data.error);
                }
            } catch (error) {
                console.error("Failed to fetch task:", error.message);  
                setTask("Unavailable");
            }
        };

        fetchCurrentTask();
    }, [deviceId]);

    return (
        <div>
            <div className="bg-black/40 rounded-3xl p-4 flex justify-between">
                <div>
                    <p className="text-sm text-gray-300">Current Task</p>
                    <p className="text-md font-bold text-white">{task}</p>
                </div>
                <div className='flex items-center bg-blue-500 rounded-xl p-3'>
                    <FaTasks size={25} className='text-white' />
                </div>
            </div>
        </div>
    );
};

export default RobotCurrentTask;
