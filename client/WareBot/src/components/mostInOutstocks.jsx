import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockMovementComponent = () => {
  const [outgoingCollapsed, setOutgoingCollapsed] = useState(false);
  const [incomingCollapsed, setIncomingCollapsed] = useState(true);
  const [incomingProducts, setIncomingProducts] = useState([]);

  // Mock data for most outgoing products - kept unchanged
  const outgoingProducts = [
    {
      stockId: "65431",
      productNameRoute: {
        name: "beta Smart Sensor",
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
        name: "Lithium Battery",
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

  // Fetch incoming average data
  useEffect(() => {
    const fetchIncomingAverages = async () => {
      try {
        const response = await axios.get('/api/incoming-average/top');
        const formattedData = response.data.map(item => ({
          productName: item.productName,
          incomingAverage: item.incomingAverage,
          dateTime: new Date(item.dateTime).toLocaleString(),
          temperature: item.temperature,
          humidity: item.humidity,
          lightning: item.lightning
        }));
        setIncomingProducts(formattedData);
      } catch (error) {
        console.error('Error fetching incoming averages:', error);
        // Use mock data if API fails
        setIncomingProducts([
          {
            productName: "Delta Flux Capacitor",
            incomingAverage: 180,
            dateTime: new Date().toLocaleString(),
            temperature: "21",
            humidity: "25",
            lightning: "95"
          },
          {
            productName: "Gamma Power Supply",
            incomingAverage: 156,
            dateTime: new Date().toLocaleString(),
            temperature: "24",
            humidity: "40",
            lightning: "82"
          },
          {
            productName: "Beta Circuit Controller",
            incomingAverage: 142,
            dateTime: new Date().toLocaleString(),
            temperature: "25",
            humidity: "55",
            lightning: "72"
          },
          {
            productName: "Zeta Thermal Module",
            incomingAverage: 128,
            dateTime: new Date().toLocaleString(),
            temperature: "29",
            humidity: "80",
            lightning: "38"
          },
          {
            productName: "Epsilon Data Hub",
            incomingAverage: 115,
            dateTime: new Date().toLocaleString(),
            temperature: "22",
            humidity: "35",
            lightning: "89"
          }
        ]);
      }
    };

    fetchIncomingAverages();
  }, []);

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

        {/* Incoming Stocks Table - UPDATED */}
        <div className="p-4">
          {!incomingCollapsed && (
            <div className="bg-blue-950 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-blue-900/50">
                <h3 className="text-blue-100 font-medium">Incoming stocks (Top 5 Most Frequent)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-blue-300 border-b border-blue-800">
                      <th className="px-4 py-2 text-left">Product Name</th>
                      <th className="px-4 py-2 text-center">Incoming Average</th>
                      <th className="px-4 py-2 text-center">Date & Time</th>
                      <th className="px-4 py-2 text-center">Temperature (Celsius)</th>
                      <th className="px-4 py-2 text-center">Humidity (%)</th>
                      <th className="px-4 py-2 text-center">Lightning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomingProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-blue-800/50 hover:bg-blue-900/20"
                      >
                        <td className="px-4 py-3 text-blue-100">{product.productName}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.incomingAverage}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.dateTime}</td>
                        <td className="px-4 py-3 text-center text-yellow-400">{product.temperature}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.humidity}%</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.lightning}</td>
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