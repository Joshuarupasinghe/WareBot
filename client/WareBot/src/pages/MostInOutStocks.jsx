import React, { useState } from 'react'
import StockPage from './StockPage'
import MostOutgoingStocks from './MostOutgoingStocks'
import MostIncomingStocks from './MostIncomingStocks'

const MostInOutStocks = () => {
  const [openDropdown, setOpenDropdown] = useState({
    expiring: true,
    reorder: false,
    outOfStock: false,
  })

  const toggleDropdown = (section) =>
    setOpenDropdown((prev) => ({ ...prev, [section]: !prev[section] }))

  return (
    <div className="w-full px-8 py-8 min-h-screen text-white overflow-hidden">
      {/* Most Outgoing Stocks */}
      <div className="mb-6">
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-medium">Most Outgoing Stocks</h2>
          <button
            onClick={() => toggleDropdown('expiring')}
            className="w-8 h-8 flex items-center justify-center
                       border border-indigo-500 rounded text-indigo-500
                       bg-gray-800 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline
                points={
                  openDropdown.expiring ? '6 9 12 15 18 9' : '18 15 12 9 6 15'
                }
              />
            </svg>
          </button>
        </div>
        {openDropdown.expiring && (
          <div className="px-6 py-4 mt-2 overflow-hidden">
            <MostOutgoingStocks />
          </div>
        )}
      </div>

      {/* Most Incoming Stocks */}
      <div className="mb-6">
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-medium">Most Incoming Stocks</h2>
          <button
            onClick={() => toggleDropdown('reorder')}
            className="w-8 h-8 flex items-center justify-center
                       border border-indigo-500 rounded text-indigo-500
                       bg-gray-800 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline
                points={
                  openDropdown.reorder ? '6 9 12 15 18 9' : '18 15 12 9 6 15'
                }
              />
            </svg>
          </button>
        </div>
        {openDropdown.reorder && (
          <div className="px-6 py-4 mt-2 overflow-hidden">
            <MostIncomingStocks />
          </div>
        )}
      </div>
    </div>
  )
}

export default MostInOutStocks;
