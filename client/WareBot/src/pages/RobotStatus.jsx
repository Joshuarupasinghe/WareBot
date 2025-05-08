import React from 'react'
import RobotCurrentTask from '../components/RobotCurrentTask';
import PendingStockTable from '../components/PendingStockTable';

const RobotStatus = () => {

    return (
        <div className='p-8'>
            <div className="bg-black/30 p-8 rounded-2xl text-white w-2/4 shadow-lg mb-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Robot Status</h2>
                    <p className="text-sm bg-white/10 rounded-lg px-4 py-3">
                        Stock ID <span className="font-bold text-white">#S0003</span>
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 gap-4 mt-6 items-start">
                    {/* Left Section - Tasks */}
                    <div className="space-y-4">
                        <div className='w-auto'>
                            <RobotCurrentTask />
                        </div>
                        <div className="bg-black/40 rounded-3xl p-4 w-auto">
                            <p className="text-sm text-gray-300">Next Task</p>
                            <p className="text-lg font-semibold">Storing</p>
                        </div>
                    </div>

                    {/* Right Section - Progress */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-40 h-40">
                            {/* Placeholder for circular progress */}
                            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-teal-400"
                                    stroke="currentColor"
                                    strokeWidth="2.8"
                                    fill="none"
                                    strokeDasharray="70, 100"
                                    d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-xs text-gray-300">Completed</p>
                                <p className="text-4xl font-bold">70%</p>
                                <p className="text-xs text-gray-400">Total Tasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PendingStock Table */}
            <PendingStockTable />
        </div>
    )
}

export default RobotStatus
