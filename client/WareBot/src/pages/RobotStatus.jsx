import React, { useEffect, useState, useRef } from 'react';
import RobotCurrentTask from '../components/RobotCurrentTask';
import PendingStockTable from '../components/PendingStockTable';

const RobotStatus = () => {
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextTask, setNextTask] = useState("Calculating...");
    const [percentage, setPercentage] = useState(0);

    const intervalRef = useRef(null);
    const pollingRef = useRef(null);
    const transitionTimeoutRef = useRef(null);
    const lastStatusRef = useRef("");
    const lastStockIdRef = useRef("");
    const targetPercentageRef = useRef(0);
    const startPercentageRef = useRef(0);

    const storingFlow = ["Fetching", "Moving to Shelf", "Placing", "Completed"];
    const deliveringFlow = ["Fetching Delivery", "Picking", "Moving to D-Zone", "Completed"];

    const getFlow = (status) => {
        if (storingFlow.includes(status)) return storingFlow;
        if (deliveringFlow.includes(status)) return deliveringFlow;
        return [];
    };
    const getStoredProgress = (stockId, status) => {
        const key = `robotProgress-${stockId}-${status}`;
        const stored = localStorage.getItem(key);
        return stored ? parseInt(stored, 10) : null;
    };

    const setStoredProgress = (stockId, status, progress) => {
        const key = `robotProgress-${stockId}-${status}`;
        localStorage.setItem(key, progress);
    };


    const getPercentageRange = (status) => {
        switch (status) {
            case "Fetching":
            case "Fetching Delivery":
                return [0, 25];
            case "Moving to Shelf":
            case "Picking":
                return [25, 50];
            case "Placing":
            case "Moving to D-Zone":
                return [50, 75];
            case "Completed":
                return [75, 100];
            default:
                return [0, 0];
        }
    };

    const graduallyIncreaseProgress = (start, end, stockId, status) => {
        clearInterval(intervalRef.current);
        setPercentage(start);
        setStoredProgress(stockId, status, start); // store start immediately

        intervalRef.current = setInterval(() => {
            setPercentage(prev => {
                if (prev < end) {
                    const updated = prev + 1;
                    setStoredProgress(stockId, status, updated); // update storage on change
                    return updated;
                } else {
                    clearInterval(intervalRef.current);

                    if (end === 75) {
                        transitionTimeoutRef.current = setTimeout(() => {
                            graduallyIncreaseProgress(75, 100, stockId, status);
                        }, 5000);
                    } else if (end === 100) {
                        transitionTimeoutRef.current = setTimeout(() => {
                            fetchRobotStatus(true);
                        }, 3000);
                    }

                    return prev;
                }
            });
        }, 3000);
    };


    const fetchRobotStatus = async (forceNextStock = false) => {
        try {
            const res = await fetch('http://localhost:5000/api/robot/robot-status/latest');
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Failed to fetch');

            const isNewStatus = forceNextStock || data.status !== lastStatusRef.current || data.stockId !== lastStockIdRef.current;

            if (isNewStatus) {
                const flow = getFlow(data.status);
                const index = flow.indexOf(data.status);
                const next = flow[index + 1] || "Completed";
                const [start, target] = getPercentageRange(data.status);
                const saved = getStoredProgress(data.stockId, data.status);
                const startFrom = saved !== null && saved < target ? saved : start;

                lastStatusRef.current = data.status;
                lastStockIdRef.current = data.stockId;

                setStatusData(data);
                setNextTask(next);
                targetPercentageRef.current = target;
                startPercentageRef.current = startFrom;

                graduallyIncreaseProgress(startFrom, target, data.stockId, data.status);
            }

        } catch (err) {
            setError(err.message || 'Error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRobotStatus();
        pollingRef.current = setInterval(fetchRobotStatus, 3000);

        return () => {
            clearInterval(pollingRef.current);
            clearInterval(intervalRef.current);
            clearTimeout(transitionTimeoutRef.current);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!statusData) return <div>No status data found.</div>;

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
                        <RobotCurrentTask task={statusData.status} />
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
                                    strokeDasharray={`${percentage}, 100`}
                                    d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-xs text-gray-300">{statusData.status}</p>
                                <p className="text-4xl font-bold">{percentage}%</p>
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
