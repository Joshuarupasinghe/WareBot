import React, { useState, useEffect } from 'react';
import TextField from './TextField'; // adjust the import path as needed

const QRGeneratorPage = () => {
  const [formData, setFormData] = useState({
    StockId: "",
    Name: "",
    Price: "",
    Category: "",
    ExpiryDate: "",
    ManufactureDate: "",
    BatchNumber: "",
    Quantity: "",
    RouteNumber: "",
    Temperature: "",
    Weight: "",
    Lighting: "",
    Humidity: ""
  });

  const [qrData, setQrData] = useState("");
  const [stockIdCounter, setStockIdCounter] = useState(1);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, StockId: stockIdCounter }));
  }, [stockIdCounter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateQR = () => {
    setQrData(JSON.stringify(formData));
    setStockIdCounter((prev) => prev + 1);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-900 to-blue-600 min-h-screen flex justify-center items-center">
      <div className="bg-[#031C30] p-6 rounded-xl w-full max-w-5xl text-white shadow-lg flex flex-col md:flex-row">

        {/* Left Side: Form Inputs */}
        <div className="w-full md:w-1/2 p-4 border-b md:border-r border-gray-500">
          <div className="flex flex-col gap-6">
            {Object.keys(formData).map((key) => (
              <TextField
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').trim()}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                disabled={key === 'StockId'}
              />
            ))}
          </div>
          <button
            onClick={handleGenerateQR}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto block"
          >
            Generate QR Code
          </button>
        </div>

        {/* Right Side: QR Code Section */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">QR Code</h2>
          <div className="bg-white p-4 rounded-lg flex justify-center items-center">
            {qrData ? (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`}
                alt="QR Code"
                className="w-40 h-40"
              />
            ) : (
              <p className="text-gray-400">QR will be generated here</p>
            )}
          </div>
          <button
            onClick={handleGenerateQR}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto block"
          >
            Print QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorPage;
