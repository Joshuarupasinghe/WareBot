import React, { useState } from 'react';

const StockMovementComponent = () => {
  const [outgoingCollapsed, setOutgoingCollapsed] = useState(false);
  const [incomingCollapsed, setIncomingCollapsed] = useState(true);

  // Mock data for most outgoing products - updated with numeric lightning and humidity
  const outgoingProducts = [
    {
      stockId: "65431",
      productNameRoute: {
        name: "Alpha Smart Sensor",
        route: "12A"
      },
      batchNo: "23434",
      quantity: "10,000",
      priceLKR: "25,000",
      category: "Sensors",
      temperatureCelsius: "28",
      weightKg: "0.45",
      lightning: "23",
      humidity: "35",
      averageUsage: "142"
    },
    {
      stockId: "65432",
      productNameRoute: {
        name: "Omega Lithium Battery",
        route: "5C"
      },
      batchNo: "23678",
      quantity: "15,000",
      priceLKR: "8,500",
      category: "Power",
      temperatureCelsius: "22",
      weightKg: "0.85",
      lightning: "40",
      humidity: "45",
      averageUsage: "240"
    },
    {
      stockId: "65433",
      productNameRoute: {
        name: "Xenon LED Panel",
        route: "14D"
      },
      batchNo: "23764",
      quantity: "5,000",
      priceLKR: "12,200",
      category: "Lighting",
      temperatureCelsius: "24",
      weightKg: "1.2",
      lightning: "12",
      humidity: "50",
      averageUsage: "89"
    },
    {
      stockId: "65434",
      productNameRoute: {
        name: "Thermostat Module",
        route: "7B"
      },
      batchNo: "23893",
      quantity: "20,000",
      priceLKR: "15,600",
      category: "Control",
      temperatureCelsius: "26",
      weightKg: "0.35",
      lightning: "65",
      humidity: "75",
      averageUsage: "187"
    },
    {
      stockId: "65435",
      productNameRoute: {
        name: "Circuit Control Boards",
        route: "3E"
      },
      batchNo: "24019",
      quantity: "25,000",
      priceLKR: "18,900",
      category: "Electronics",
      temperatureCelsius: "22",
      weightKg: "0.28",
      lightning: "78",
      humidity: "30",
      averageUsage: "205"
    }
  ];

  // Mock data for most incoming products 
  const incomingProducts = [
    {
      stockId: "87631",
      productNameRoute: {
        name: "Delta Flux Capacitor",
        route: "9D"
      },
      batchNo: "31456",
      quantity: "18,000",
      priceLKR: "32,400",
      category: "Components",
      temperatureCelsius: "21",
      weightKg: "1.8",
      lightning: "95",
      humidity: "25",
      averageUsage: "0"
    },
    {
      stockId: "87632",
      productNameRoute: {
        name: "Gamma Power Supply",
        route: "4G"
      },
      batchNo: "31785",
      quantity: "22,000",
      priceLKR: "45,200",
      category: "Power",
      temperatureCelsius: "24",
      weightKg: "2.4",
      lightning: "82",
      humidity: "40",
      averageUsage: "0"
    },
    {
      stockId: "87633",
      productNameRoute: {
        name: "Beta Circuit Controller",
        route: "6J"
      },
      batchNo: "31964",
      quantity: "14,000",
      priceLKR: "22,500",
      category: "Control",
      temperatureCelsius: "25",
      weightKg: "0.65",
      lightning: "72",
      humidity: "55",
      averageUsage: "0"
    },
    {
      stockId: "87634",
      productNameRoute: {
        name: "Zeta Thermal Module",
        route: "2H"
      },
      batchNo: "32108",
      quantity: "30,000",
      priceLKR: "18,900",
      category: "Thermal",
      temperatureCelsius: "29",
      weightKg: "0.95",
      lightning: "38",
      humidity: "80",
      averageUsage: "0"
    },
    {
      stockId: "87635",
      productNameRoute: {
        name: "Epsilon Data Hub",
        route: "8A"
      },
      batchNo: "32245",
      quantity: "26,000",
      priceLKR: "56,800",
      category: "Networking",
      temperatureCelsius: "22",
      weightKg: "1.5",
      lightning: "89",
      humidity: "35",
      averageUsage: "0"
    }
  ];

  return (
    <div className="w-full bg-blue-950 text-white">
      {/* Main Content - Full Width */}
      <div className="w-full">
        
        {/* Most Outgoing Stocks Section */}
        <div className="bg-blue-900 px-6 py-3 border-b border-blue-800 flex justify-between items-center">
          <div className="text-xl font-medium">Most Outgoing Stocks</div>
          <button
            className="bg-blue-800 w-8 h-8 flex items-center justify-center rounded-md"
            onClick={() => setOutgoingCollapsed(!outgoingCollapsed)}
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
              className="text-blue-300"
            >
              <polyline points={outgoingCollapsed ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}></polyline>
            </svg>
          </button>
        </div>

        {/* Outgoing Stocks Table */}
        <div className="p-4">
          {!outgoingCollapsed && (
            <div className="bg-blue-950 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-blue-900/50">
                <h3 className="text-blue-100 font-medium">Outgoing stocks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-blue-300 border-b border-blue-800">
                      <th className="px-4 py-2 text-left">Stock ID</th>
                      <th className="px-4 py-2 text-left">Product Name & Route</th>
                      <th className="px-4 py-2 text-left">Batch No</th>
                      <th className="px-4 py-2 text-center">Quantity</th>
                      <th className="px-4 py-2 text-center">Price (LKR)</th>
                      <th className="px-4 py-2 text-center">Category</th>
                      <th className="px-4 py-2 text-center">Temperature (Celsius)</th>
                      <th className="px-4 py-2 text-center">Weight (kg)</th>
                      <th className="px-4 py-2 text-center">Lightning</th>
                      <th className="px-4 py-2 text-center">Humidity</th>
                      <th className="px-4 py-2 text-right">Average Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outgoingProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-blue-800/50 hover:bg-blue-900/20"
                      >
                        <td className="px-4 py-3 text-blue-100">{product.stockId}</td>
                        <td className="px-4 py-3">
                          <div className="text-blue-100">{product.productNameRoute.name}</div>
                          <div className="text-xs text-blue-400">Route {product.productNameRoute.route}</div>
                        </td>
                        <td className="px-4 py-3 text-blue-100">{product.batchNo}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.quantity}</td>
                        <td className="px-4 py-3 text-center text-green-400">{product.priceLKR}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.category}</td>
                        <td className="px-4 py-3 text-center text-yellow-400">{product.temperatureCelsius}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.weightKg}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.lightning}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.humidity}%</td>
                        <td className="px-4 py-3 text-right text-blue-100">{product.averageUsage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Most Incoming Stocks Section */}
        <div className="bg-blue-900 px-6 py-3 border-b border-blue-800 flex justify-between items-center">
          <div className="text-xl font-medium">Most Incoming Stocks</div>
          <button
            className="bg-blue-800 w-8 h-8 flex items-center justify-center rounded-md"
            onClick={() => setIncomingCollapsed(!incomingCollapsed)}
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
              className="text-blue-300"
            >
              <polyline points={incomingCollapsed ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}></polyline>
            </svg>
          </button>
        </div>

        {/* Incoming Stocks Table */}
        <div className="p-4">
          {!incomingCollapsed && (
            <div className="bg-blue-950 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-blue-900/50">
                <h3 className="text-blue-100 font-medium">Incoming stocks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-blue-300 border-b border-blue-800">
                      <th className="px-4 py-2 text-left">Stock ID</th>
                      <th className="px-4 py-2 text-left">Product Name & Route</th>
                      <th className="px-4 py-2 text-left">Batch No</th>
                      <th className="px-4 py-2 text-center">Quantity</th>
                      <th className="px-4 py-2 text-center">Price (LKR)</th>
                      <th className="px-4 py-2 text-center">Category</th>
                      <th className="px-4 py-2 text-center">Temperature (Celsius)</th>
                      <th className="px-4 py-2 text-center">Weight (kg)</th>
                      <th className="px-4 py-2 text-center">Lightning</th>
                      <th className="px-4 py-2 text-center">Humidity</th>
                      <th className="px-4 py-2 text-right">Average Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomingProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-blue-800/50 hover:bg-blue-900/20"
                      >
                        <td className="px-4 py-3 text-blue-100">{product.stockId}</td>
                        <td className="px-4 py-3">
                          <div className="text-blue-100">{product.productNameRoute.name}</div>
                          <div className="text-xs text-blue-400">Route {product.productNameRoute.route}</div>
                        </td>
                        <td className="px-4 py-3 text-blue-100">{product.batchNo}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.quantity}</td>
                        <td className="px-4 py-3 text-center text-green-400">{product.priceLKR}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.category}</td>
                        <td className="px-4 py-3 text-center text-yellow-400">{product.temperatureCelsius}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.weightKg}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.lightning}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.humidity}%</td>
                        <td className="px-4 py-3 text-right text-blue-100">{product.averageUsage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockMovementComponent;