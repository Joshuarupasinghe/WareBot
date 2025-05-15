import React, { useState, useEffect, useRef } from 'react';
import TextField from './TextField';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

const QRScannerPage = () => {
  const [scanResult, setScanResult] = useState('');
  const [stockId, setStockId] = useState('');
  const [routeNumber, setRouteNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const qrCodeRegionId = 'html5qr-code-full-region';
  const html5QrCodeRef = useRef(null);
  const scanningRef = useRef(false);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

    Html5Qrcode.getCameras()
      .then(devices => {
        if (devices.length > 0) {
          const cameraId = devices[0].id;
          html5QrCodeRef.current
            .start(
              cameraId,
              { fps: 10, qrbox: 250 },
              decodedText => {
                setScanResult(decodedText);
                setErrorMsg('');

                try {
                  const data = JSON.parse(decodedText);

                  if (data.StockId && data.RouteNumber) {
                    setStockId(data.StockId);
                    setRouteNumber(data.RouteNumber);
                    setStatusMessage("✅ QR code scanned successfully!");
                  } else {
                    throw new Error("Missing required fields");
                  }
                } catch (e) {
                  setErrorMsg('❌ Invalid QR data format',e);
                  setStockId('');
                  setRouteNumber('');
                }
              },
              () => {
                // Ignore scan errors
              }
            )
            .then(() => {
              scanningRef.current = true;
            })
            .catch(err => setErrorMsg(`❌ ${err.message}`));
        } else {
          setErrorMsg('❌ No cameras found');
        }
      })
      .catch(err => setErrorMsg(`❌ ${err.message}`));

    return () => {
      if (scanningRef.current && html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch(() => {});
      }
    };
  }, []);

  // ✅ Handler to send data to the robot
  const handleSendToRobot = async () => {
    if (!stockId || !routeNumber) {
      setErrorMsg("❌ Stock ID and Route Number are required to send to the robot.");
      return;
    }

    try {
      setStatusMessage("🔄 Sending data to robot...");
      await axios.post('http://localhost:5000/api/robot/robot001/send-stock', {
        stockId,
        routeNumber
      });

      setStatusMessage("✅ Data sent to robot successfully!");
      setErrorMsg('');
    } catch (error) {
      console.error('Error sending to robot:', error.response ? error.response.data : error.message);
      setErrorMsg("❌ Failed to send data to robot. Check console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 p-4">
      <h1 className="text-2xl font-semibold text-white mb-4">Scan QR Code</h1>

      <div className="w-full max-w-sm bg-[#031C30] p-4 rounded-xl shadow-lg">
        <div
          id={qrCodeRegionId}
          className="w-full h-64 sm:h-72 md:h-80 mb-4 rounded-lg overflow-hidden"
        />

        <TextField
          label="Scanned Data"
          placeholder="Waiting for scan..."
          value={scanResult}
          readOnly
        />

        <TextField
          label="Stock ID"
          placeholder="Auto-filled from QR"
          value={stockId}
          readOnly
        />

        <TextField
          label="Route Number"
          placeholder="Auto-filled from QR"
          value={routeNumber}
          readOnly
        />

        <button
          onClick={handleSendToRobot}
          className={`w-full mt-4 py-2 px-4 text-white rounded-md ${
            !stockId || !routeNumber ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={!stockId || !routeNumber}
        >
          Send to Robot
        </button>

        {statusMessage && (
          <p className="text-green-400 text-sm mt-2">{statusMessage}</p>
        )}
        
        {errorMsg && (
          <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default QRScannerPage;
