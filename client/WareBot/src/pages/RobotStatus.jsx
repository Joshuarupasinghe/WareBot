import React from 'react'
import RobotCurrentTask from '../components/RobotCurrentTask';

const RobotStatus = () => {

    const pendingStock = [
        { qp: "01", stockId: "02334", productName: "Alpha Smart Sensor", route: "Route 12A", batchNo: "23434", quantity: "23434", location: "00W", task: "Fetching", time: "45 Min" },
        { qp: "02", stockId: "02334", productName: "Omega Lithium Battery", route: "5C", batchNo: "23434", quantity: "23434", location: "5C", task: "Delivering", time: "40 Min" },
        { qp: "03", stockId: "02334", productName: "Xenon LED Panel", route: "14D", batchNo: "23434", quantity: "23434", location: "14D", task: "Delivering", time: "38 Min" },
        { qp: "04", stockId: "02334", productName: "Vertex Cooling Fan", route: "3E", batchNo: "23434", quantity: "23434", location: "00W", task: "Fetching", time: "30 Min" },
        { qp: "05", stockId: "02334", productName: "Delta Hydraulic Pump", route: "7F", batchNo: "23434", quantity: "23434", location: "00W", task: "Fetching", time: "6 Min" }
    ];

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

            <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-6 py-4">
                    <h3 className="text-white text-lg font-medium">
                        Pending Stock Queue
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs text-gray-400 uppercase border-b border-gray-700">
                                <th className="px-6 py-3 text-left">Queue Position</th>
                                <th className="px-6 py-3 text-left">STOCK ID</th>
                                <th className="px-6 py-3 text-left">PRODUCT NAME & Destination</th>
                                <th className="px-6 py-3 text-center">BATCH NO</th>
                                <th className="px-6 py-3 text-center">QUANTITY</th>
                                <th className="px-6 py-3 text-center">Origin Location</th>
                                <th className="px-6 py-3 text-center">Requested Task</th>
                                <th className="px-6 py-3 text-center">Requested Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingStock.map((product, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-700 text-white"
                                >
                                    <td className="px-6 py-4">{product.qp}</td>
                                    <td className="px-6 py-4">{product.stockId}</td>
                                    <td className="px-6 py-4">
                                        <div>{product.productName}</div>
                                        <div className="text-sm text-gray-400">
                                            Route {product.route}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">{product.batchNo}</td>
                                    <td className="px-6 py-4 text-center">{product.quantity}</td>
                                    <td className="px-6 py-4 text-center">{product.location}</td>
                                    <td className="px-6 py-4 text-center">{product.task}</td>
                                    <td className="px-6 py-4 text-center">{product.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RobotStatus