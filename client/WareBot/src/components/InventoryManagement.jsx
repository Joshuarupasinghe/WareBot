import React, { useState } from 'react';

const ExpiringStocksSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mock data for expiring products
  const expiringProducts = [
    {
      stockId: "02334",
      productName: "Alpha Smart Sensor",
      route: "12A",
      batchNo: "23434",
      quantity: "23434",
      expiredDate: "14/06/21"
    },
    {
      stockId: "02334",
      productName: "Omega Lithium Battery",
      route: "5C",
      batchNo: "23434",
      quantity: "23434",
      expiredDate: "14/06/21"
    },
    {
      stockId: "02334",
      productName: "Xenon LED Panel",
      route: "14D",
      batchNo: "23434",
      quantity: "23434",
      expiredDate: "14/06/21"
    },
    {
      stockId: "02334",
      productName: "Vertex Cooling Fan",
      route: "3E",
      batchNo: "23434",
      quantity: "23434",
      expiredDate: "14/06/21"
    },
    {
      stockId: "02334",
      productName: "Delta Hydraulic Pump",
      route: "7F",
      batchNo: "23434",
      quantity: "23434",
      expiredDate: "14/06/21"
    },
    {
      stockId: "02334",
      productName: "Fusion Thermal Insulator",
      route: "8J",
      batchNo: "23434",
      quantity: "23434",
      expiredDate: "14/06/21"
    }
  ];

  return (
    <div className="w-full">

      {/* Divider */}
      <div className="px-8 py-4">
        <div className="border-t border-gray-700"></div>
      </div>


      {/* Top header with collapse button */}
      <div className="bg-gray-900 px-8 py-4 text-white border-b border-gray-700 flex justify-between items-center">
        <div className="text-2xl font-medium">Expiring soon Stocks</div>
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

      {/* Expiring Soon Stocks Section */}
      <div className="px-8 mb-8">
        {!isCollapsed && (
          <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
            <div className="px-6 py-4">
              <h3 className="text-white text-lg font-medium">Expiring soon products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase border-b border-gray-700">
                    <th className="px-6 py-3 text-left">STOCK ID</th>
                    <th className="px-6 py-3 text-left">PRODUCT NAME & ROUTE</th>
                    <th className="px-6 py-3 text-center">BATCH NO</th>
                    <th className="px-6 py-3 text-center">QUANTITY</th>
                    <th className="px-6 py-3 text-right">EXPIRY/ED</th>
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
                        <div className="text-sm text-gray-400">Route {product.route}</div>
                      </td>
                      <td className="px-6 py-4 text-center">{product.batchNo}</td>
                      <td className="px-6 py-4 text-center">{product.quantity}</td>
                      <td className="px-6 py-4 text-right text-red-500">{product.expiredDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Stock List Section */}
      <div className="bg-gray-900 px-8 py-4 text-white border-b border-gray-700 flex justify-between items-center">
        <div className="text-2xl font-medium">Stock Lists</div>
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

      {/* Reorder Suggestions Section */}
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
    </div>
  );
};

export default ExpiringStocksSection;