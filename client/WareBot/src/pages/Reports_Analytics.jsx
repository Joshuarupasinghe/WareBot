import React, { useState } from 'react';
import OrderManagementReport from './OrderManagementReport';
import PerformanceReport from './PerformanceReport';

const Reports_Analytics = () => {
  const [openDropdown, setOpenDropdown] = useState({
    expiring: true,
    reorder: false,
  });

  const toggleDropdown = (section) =>
    setOpenDropdown((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="w-full px-8 py-8 min-h-screen text-white overflow-hidden">
      {/* Performance Reports */}
      <div className="mb-6">
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-medium">Performance Reports</h2>
          <button
            onClick={() => toggleDropdown('expiring')}
            className="w-8 h-8 flex items-center justify-center border border-indigo-500 rounded text-indigo-500 bg-gray-800 hover:bg-gray-700"
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
              <polyline
                points={openDropdown.expiring ? '6 9 12 15 18 9' : '18 15 12 9 6 15'}
              />
            </svg>
          </button>
        </div>
        {openDropdown.expiring && (
          <div className="px-6 py-4 mt-2 overflow-hidden">
            <PerformanceReport />
          </div>
        )}
      </div>

      {/* Order Management Report */}
      <div className="mb-6">
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-medium">Order Management Report</h2>
          <button
            onClick={() => toggleDropdown('reorder')}
            className="w-8 h-8 flex items-center justify-center border border-indigo-500 rounded text-indigo-500 bg-gray-800 hover:bg-gray-700"
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
              <polyline
                points={openDropdown.reorder ? '6 9 12 15 18 9' : '18 15 12 9 6 15'}
              />
            </svg>
          </button>
        </div>
        {openDropdown.reorder && (
          <div className="px-6 py-4 mt-2 overflow-hidden">
            <OrderManagementReport />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports_Analytics;
