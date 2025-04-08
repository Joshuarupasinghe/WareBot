import React, { useState } from 'react';

const StockMovementComponent = () => {
  const [outgoingCollapsed, setOutgoingCollapsed] = useState(false);
  const [incomingCollapsed, setIncomingCollapsed] = useState(true);

  // Mock data for most outgoing products - matching the data shown in screenshot
  const outgoingProducts = [
    {
      id: "65431",
      name: "Alpha Smart Sensor",
      route: "12A",
      itemid: "45AB",
      batch: "23434",
      storage: "10,000",
      onway: "5,000",
      recieved: "0",
      outgoing: "250,000",
      return: "30",
      sold: "142",
      remain: "1023"
    },
    {
      id: "65432",
      name: "Omega Lithium Battery",
      route: "5C",
      itemid: "75AB",
      batch: "23678",
      storage: "15,000",
      onway: "8,000",
      recieved: "0",
      outgoing: "430,000",
      return: "15",
      sold: "240",
      remain: "1867"
    },
    {
      id: "65433",
      name: "Xenon LED Panel",
      route: "14D",
      itemid: "62AB",
      batch: "23764",
      storage: "5,000",
      onway: "2,000",
      recieved: "0",
      outgoing: "120,000",
      return: "45",
      sold: "89",
      remain: "534"
    },
    {
      id: "65434",
      name: "Thermostat Module",
      route: "7B",
      itemid: "32AB", 
      batch: "23893",
      storage: "20,000",
      onway: "6,000",
      recieved: "0",
      outgoing: "280,000",
      return: "12",
      sold: "187",
      remain: "956"
    },
    {
      id: "65435",
      name: "Circuit Control Boards",
      route: "3E",
      itemid: "91AB",
      batch: "24019",
      storage: "25,000",
      onway: "9,000",
      recieved: "0",
      outgoing: "380,000",
      return: "28",
      sold: "205",
      remain: "1320"
    }
  ];

  // Mock data for most incoming products
  const incomingProducts = [
    {
      id: "87631",
      name: "Delta Flux Capacitor",
      route: "9D",
      itemid: "28CD",
      batch: "31456",
      storage: "18,000",
      onway: "12,000",
      recieved: "7,500",
      outgoing: "0",
      return: "0",
      sold: "0",
      remain: "7,500"
    },
    {
      id: "87632",
      name: "Gamma Power Supply",
      route: "4G",
      itemid: "52CD",
      batch: "31785",
      storage: "22,000",
      onway: "15,000",
      recieved: "9,800",
      outgoing: "0",
      return: "0",
      sold: "0",
      remain: "9,800"
    },
    {
      id: "87633",
      name: "Beta Circuit Controller",
      route: "6J",
      itemid: "37CD",
      batch: "31964",
      storage: "14,000",
      onway: "10,000",
      recieved: "6,200",
      outgoing: "0",
      return: "0",
      sold: "0",
      remain: "6,200"
    },
    {
      id: "87634",
      name: "Zeta Thermal Module",
      route: "2H",
      itemid: "64CD",
      batch: "32108",
      storage: "30,000",
      onway: "18,000",
      recieved: "11,500",
      outgoing: "0",
      return: "0",
      sold: "0",
      remain: "11,500"
    },
    {
      id: "87635",
      name: "Epsilon Data Hub",
      route: "8A",
      itemid: "19CD",
      batch: "32245",
      storage: "26,000",
      onway: "16,000",
      recieved: "10,200",
      outgoing: "0",
      return: "0",
      sold: "0",
      remain: "10,200"
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
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">ITEM ID</th>
                      <th className="px-4 py-2 text-center">BATCH</th>
                      <th className="px-4 py-2 text-center">STORAGE</th>
                      <th className="px-4 py-2 text-center">ON WAY</th>
                      <th className="px-4 py-2 text-center">RECEIVED</th>
                      <th className="px-4 py-2 text-center">OUTGOING</th>
                      <th className="px-4 py-2 text-center">RETURN</th>
                      <th className="px-4 py-2 text-center">SOLD</th>
                      <th className="px-4 py-2 text-right">REMAIN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outgoingProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-blue-800/50 hover:bg-blue-900/20"
                      >
                        <td className="px-4 py-3 text-blue-100">{product.id}</td>
                        <td className="px-4 py-3">
                          <div className="text-blue-100">{product.name}</div>
                          <div className="text-xs text-blue-400">Route {product.route}</div>
                        </td>
                        <td className="px-4 py-3 text-blue-100">{product.itemid}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.batch}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.storage}</td>
                        <td className="px-4 py-3 text-center text-yellow-400">{product.onway}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.recieved}</td>
                        <td className="px-4 py-3 text-center text-green-400">{product.outgoing}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.return}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.sold}</td>
                        <td className="px-4 py-3 text-right text-blue-100">{product.remain}</td>
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
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">ITEM ID</th>
                      <th className="px-4 py-2 text-center">BATCH</th>
                      <th className="px-4 py-2 text-center">STORAGE</th>
                      <th className="px-4 py-2 text-center">ON WAY</th>
                      <th className="px-4 py-2 text-center">RECEIVED</th>
                      <th className="px-4 py-2 text-center">OUTGOING</th>
                      <th className="px-4 py-2 text-center">RETURN</th>
                      <th className="px-4 py-2 text-center">SOLD</th>
                      <th className="px-4 py-2 text-right">REMAIN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomingProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-blue-800/50 hover:bg-blue-900/20"
                      >
                        <td className="px-4 py-3 text-blue-100">{product.id}</td>
                        <td className="px-4 py-3">
                          <div className="text-blue-100">{product.name}</div>
                          <div className="text-xs text-blue-400">Route {product.route}</div>
                        </td>
                        <td className="px-4 py-3 text-blue-100">{product.itemid}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.batch}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.storage}</td>
                        <td className="px-4 py-3 text-center text-yellow-400">{product.onway}</td>
                        <td className="px-4 py-3 text-center text-blue-500">{product.recieved}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.outgoing}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.return}</td>
                        <td className="px-4 py-3 text-center text-blue-100">{product.sold}</td>
                        <td className="px-4 py-3 text-right text-blue-100">{product.remain}</td>
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