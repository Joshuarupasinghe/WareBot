import React, { useEffect, useState } from 'react';
import { FaTasks } from "react-icons/fa";

const RobotCurrentTask = () => {
    const [task, setTask] = useState("Loading...");
    const [lastFetchedTask, setLastFetchedTask] = useState(null);

    useEffect(() => {
        const fetchLatestStatus = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/robot/robot-status/latest");
                const data = await res.json();
                if (res.ok) {
                    if (data.status !== lastFetchedTask) {
                        setTask(data.status || "No task");
                        setLastFetchedTask(data.status);
                    }
                } else {
                    setTask("Error");
                    console.error(data.message || data.error);
                }
            } catch (error) {
                console.error("Failed to fetch status:", error.message);  
                setTask("Unavailable");
            }
        };

        fetchLatestStatus();

        const interval = setInterval(fetchLatestStatus, 2000);

        return () => clearInterval(interval);
    }, [lastFetchedTask]);

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
