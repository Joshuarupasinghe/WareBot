import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from './TextField';

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

  const [formErrors, setFormErrors] = useState({});
  const [qrData, setQrData] = useState(""); // Holds the QR code data
  const [stockIdCounter, setStockIdCounter] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchStockIdCounter = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stock/get-counter");
        setStockIdCounter(response.data.StockId);
      } catch (error) {
        console.error("Error fetching StockId counter:", error);
      }
    };

    fetchStockIdCounter();
  }, []);

  useEffect(() => {
    if (stockIdCounter > 0) {
      setFormData((prev) => ({ ...prev, StockId: stockIdCounter }));
    }
  }, [stockIdCounter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGenerateQR = async () => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "StockId" && !value.trim()) {
        errors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setStatusMessage("❌ Please fill in all required fields.");
      return;
    }

    setFormErrors({});
    try {
      setStatusMessage("🔄 Saving stock and generating QR...");

      const response = await axios.post("http://localhost:5000/api/stock/add", formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const savedStock = response.data.savedStock || formData;
      const qrPayload = `StockId: ${savedStock.StockId}\nRouteNumber: ${savedStock.RouteNumber}`;
      setQrData(qrPayload);

      setStatusMessage("✅ Stock saved successfully and QR generated!");
      setStockIdCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Error saving stock:", error);
      setStatusMessage("❌ Failed to save stock. Check console.");
    }
  };

  const handlePrintQR = () => {
    const printContents = document.getElementById("qr-to-print").innerHTML;
    if (printContents) {
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><head><title>Print QR</title>');
      printWindow.document.write('<style>body { font-family: Arial; text-align: center; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500); // Add a delay to ensure the content is rendered before printing
    } else {
      alert('No QR code to print!');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-900 to-blue-600 min-h-screen flex justify-center items-center">
      <div className="bg-[#031C30] p-6 rounded-xl w-full max-w-5xl text-white shadow-lg flex flex-col md:flex-row">
        {/* Left Side: Form Inputs */}
        <div className="w-full md:w-1/2 p-4 border-b md:border-r border-gray-500">
          <div className="flex flex-col gap-4">
            {Object.keys(formData).map((key) => (
              <TextField
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').trim()}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                type={key === "ExpiryDate" || key === "ManufactureDate" ? "date" : "text"}
                disabled={key === 'StockId'}
                error={formErrors[key]}
              />
            ))}
          </div>
          <button
            onClick={handleGenerateQR}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto block"
          >
            Generate QR Code
          </button>

          {statusMessage && (
            <div className="mt-4 text-center text-sm font-medium text-green-400">
              {statusMessage}
            </div>
          )}
        </div>

        {/* Right Side: QR Code + Print */}
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">QR Code</h2>
          <div className="bg-white p-4 rounded-lg flex justify-center items-center">
            {qrData ? (
              <div id="qr-to-print">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`}
                  alt="QR Code"
                  className="w-40 h-40"
                />
              </div>
            ) : (
              <p className="text-gray-400">QR will be generated here</p>
            )}
          </div>
          {qrData && (
            <button
              onClick={handlePrintQR}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto block"
            >
              Print QR Only
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorPage;
