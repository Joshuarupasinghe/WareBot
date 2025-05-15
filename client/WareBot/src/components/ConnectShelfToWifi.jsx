import React, { useState, useEffect } from 'react';
import TextField from './TextField';
import Button from './Button';

const ConnectShelfToWifi = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedIp = localStorage.getItem('shelfEspIp');
    if (storedIp) {
      console.log("Retrieved stored Shelf ESP IP:", storedIp);
      setMessage(`ℹ️ Last known Shelf ESP IP: ${storedIp}`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const espIp = '192.168.4.1'; // Default AP IP for Shelf ESP
    const payload = { ssid, password, espIp };

    try {
      const response = await fetch('http://localhost:5000/api/shelf/configure-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Shelf ESP New IP:", data.deviceIp);
        setMessage(`✅ Connected! Shelf ESP IP: ${data.deviceIp}`);
        localStorage.setItem('shelfEspIp', data.deviceIp);
      } else {
        setMessage(`❌ Error: ${data.message || 'Configuration failed'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-black/40 rounded-xl p-8 shadow-lg max-w-md">
      <h2 className="text-white text-xl font-bold mb-6">Connect Shelf to WiFi</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="WiFi SSID"
            placeholder="Your WiFi name"
            type="text"
            id="ssid"
            name="ssid"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <TextField
            label="WiFi Password"
            placeholder="Your WiFi Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit">Connect to Shelf</Button>
      </form>

      {message && (
        <div className="text-white mt-4">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectShelfToWifi;
