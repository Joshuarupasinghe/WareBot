import React, { useState } from 'react';

const ReorderSuggestions = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const expiringProducts = [
        {
            stockId: "02334",
            productName: "Alpha Smart Sensor",
            route: "Route 12A",
            quantity: "23434",
            reOrderLevel: "High",
        },
        {
            stockId: "02334",
            productName: "Omega Lithium Battery",
            route: "5C",
            quantity: "23434",
            reOrderLevel: "Medium",
        },
        {
            stockId: "02334",
            productName: "Xenon LED Panel",
            route: "14D",
            quantity: "23434",
            reOrderLevel: "Low",
        },
        {
            stockId: "02334",
            productName: "Vertex Cooling Fan",
            route: "3E",
            quantity: "23434",
            reOrderLevel: "Low",
        },
        {
            stockId: "02334",
            productName: "Delta Hydraulic Pump",
            route: "7F",
            quantity: "23434",
            reOrderLevel: "Medium",
        },
        {
            stockId: "02334",
            productName: "Fusion Thermal Insulator",
            route: "8J",
            quantity: "23434",
            reOrderLevel: "High",
        },
    ];

    return (
        <div>
            <div className="bg-gray-900 px-8 py-4 text-white border-b border-gray-700 flex justify-between items-center">
                <div className="text-2xl font-medium">Reorder Suggestions</div>
                <button
                    className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded border border-indigo-500 text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points={isCollapsed ? "6 9 12 15 18 9" : "18 9 12 15 6 9"}></polyline>
                    </svg>
                </button>
            </div>
            <div className="px-8 mb-8">
                {!isCollapsed && (
                    <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                        <div className="px-6 py-4">
                            <h3 className="text-white text-lg font-medium">
                                Reorder Suggestions
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-xs text-gray-400 uppercase border-b border-gray-700">
                                        <th className="px-6 py-3 text-left">STOCK ID</th>
                                        <th className="px-6 py-3 text-left">PRODUCT NAME & ROUTE</th>
                                        <th className="px-6 py-3 text-center">CURRENT QUANTITY</th>
                                        <th className="px-6 py-3 text-center">RE ORDER LEVEL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expiringProducts.map((product, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-700 text-white"
                                        >
                                            <td className="px-6 py-4">{product.stockId}</td>
                                            <td className="px-6 py-4">
                                                <div>{product.productName}</div>
                                                <div className="text-sm text-gray-400">
                                                    Route {product.route}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">{product.quantity}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={
                                                        product.reOrderLevel === "High"
                                                            ? "text-green-500"
                                                            : product.reOrderLevel === "Medium"
                                                                ? "text-yellow-500"
                                                                : "text-red-500"
                                                    }
                                                >
                                                    {product.reOrderLevel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReorderSuggestions;