import React, { useEffect, useState, useRef } from 'react';
import RobotCurrentTask from '../components/RobotCurrentTask';
import PendingStockTable from '../components/PendingStockTable';

const RobotStatus = () => {
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextTask, setNextTask] = useState("Calculating...");
    const [percentage, setPercentage] = useState(() => {
        const saved = localStorage.getItem("progressPercentage");
        return saved ? parseFloat(saved) : 0;
    });

    const intervalRef = useRef(null);
    const completedTimerRef = useRef(null);
    const jumpTimerRef = useRef(null);
    const pollingRef = useRef(null);
    const taskFlowRef = useRef([]);
    const currentIndexRef = useRef(0);
    const lastStockIdRef = useRef(null);
    const lastStatusRef = useRef(null);
    const maxPercentRef = useRef(0);
    const showCompletedRef = useRef(false);

    const storingFlow = ["Fetching", "Moving to Shelf", "Placing", "Completed"];
    const deliveringFlow = ["Fetching Delivery", "Picking", "Moving to D-Zone", "Completed"];

    const getRandomIncrement = () => Math.random() * (0.5 - 0.2) + 0.2;

    const startProgress = (maxPercent) => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setPercentage(prev => {
                const next = Math.min(prev + getRandomIncrement(), maxPercent);
                localStorage.setItem("progressPercentage", next.toFixed(2));
                if (next >= maxPercent) {
                    clearInterval(intervalRef.current);
                }
                return next;
            });
        }, 5000);
    };

    const fetchRobotStatus = async () => {
        // Avoid fetching during 4s display of Completed
        if (showCompletedRef.current) return;

        try {
            const response = await fetch('http://localhost:5000/api/robot/robot-status/latest');
            const data = await response.json();

            if (response.ok) {
                const currentTask = data.status;

                let taskFlow = [];
                if (storingFlow.includes(currentTask)) taskFlow = storingFlow;
                else if (deliveringFlow.includes(currentTask)) taskFlow = deliveringFlow;

                const currentIndex = taskFlow.indexOf(currentTask);
                const isNewStock = lastStockIdRef.current !== data.stockId;
                const isNewTask = lastStatusRef.current !== data.status;

                if (isNewStock || isNewTask) {
                    lastStockIdRef.current = data.stockId;
                    lastStatusRef.current = data.status;
                    taskFlowRef.current = taskFlow;
                    currentIndexRef.current = currentIndex;
                    const maxPercent = ((currentIndex + 1) / taskFlow.length) * 100;
                    maxPercentRef.current = maxPercent;
                    setNextTask(taskFlow[currentIndex + 1] || "Completed");

                    clearInterval(intervalRef.current);
                    clearTimeout(completedTimerRef.current);
                    clearTimeout(jumpTimerRef.current);

                    const initialMap = {
                        "Fetching": 0,
                        "Fetching Delivery": 0,
                        "Moving to Shelf": 25,
                        "Picking": 25,
                        "Placing": 50,
                        "Moving to D-Zone": 50,
                        "Completed": 75
                    };

                    const initialPercent = initialMap[currentTask] || 0;
                    setPercentage(initialPercent);
                    localStorage.setItem("progressPercentage", initialPercent.toFixed(2));

                    if (currentTask === "Completed") {
                        showCompletedRef.current = true;

                        // Go from 75% to 100% after 2s
                        jumpTimerRef.current = setTimeout(() => {
                            setPercentage(100);
                            localStorage.setItem("progressPercentage", "100");
                        }, 2000);

                        // Wait 4s total, then move to next stock
                        completedTimerRef.current = setTimeout(() => {
                            showCompletedRef.current = false;
                            lastStockIdRef.current = null;
                            lastStatusRef.current = null;
                            setPercentage(0);
                            localStorage.removeItem("progressPercentage");
                            fetchRobotStatus(); // Manual fetch to continue
                        }, 4000);
                    } else {
                        startProgress(maxPercent);
                    }

                    setStatusData(data);
                }

            } else {
                setError(data.message || 'Error fetching robot status');
            }
        } catch (err) {
            console.error('Error fetching robot status:', err);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRobotStatus();
        pollingRef.current = setInterval(fetchRobotStatus, 2000);

        return () => {
            clearInterval(pollingRef.current);
            clearInterval(intervalRef.current);
            clearTimeout(completedTimerRef.current);
            clearTimeout(jumpTimerRef.current);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!statusData) return <div>No status available for robot001.</div>;

    return (
        <div className='p-8'>
            <div className="bg-black/30 p-8 rounded-2xl text-white w-2/4 shadow-lg mb-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Robot Status</h2>
                    <p className="text-sm bg-white/10 rounded-lg px-4 py-3">
                        Stock ID <span className="font-bold text-white">#{statusData.stockId}</span>
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 items-start">
                    <div className="space-y-4">
                        <div className='w-auto'>
                            <RobotCurrentTask />
                        </div>
                        <div className="bg-black/40 rounded-3xl p-4 w-auto">
                            <p className="text-sm text-gray-300">Next Task</p>
                            <p className="text-lg font-semibold">{nextTask}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-40 h-40">
                            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-teal-400"
                                    stroke="currentColor"
                                    strokeWidth="2.8"
                                    fill="none"
                                    strokeDasharray={`${Math.min(percentage, 100)}, 100`}
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-xs text-gray-300">{statusData.status}</p>
                                <p className="text-4xl font-bold">{Math.floor(percentage)}%</p>
                                <p className="text-xs text-gray-400">Total Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PendingStockTable />
        </div>
    );
};

export default RobotStatus;
