import React, { useState, useEffect } from 'react'; // Don't forget to import useEffect
import TextField from './TextField';
import Button from './Button';

const ConnectRobotToWifi = () => {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Add useEffect here
    useEffect(() => {
        const storedIp = localStorage.getItem('espNewIp');
        if (storedIp) {
            console.log("Retrieved stored ESP IP:", storedIp);
            // Optionally set state or update your UI accordingly.
            // For example, you might want to display it:
            setMessage(`ℹ️ Last known ESP IP: ${storedIp}`);
        }
    }, []);


    // Submit handler for sending credentials to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const espIp = '192.168.4.1'; // Initially, the AP IP where the computer connects.
        const payload = { ssid, password, espIp };
      
        try {
          const response = await fetch('http://localhost:5000/api/configure-wifi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      
          const data = await response.json();
          if (response.ok) {
            // Log the new ESP IP to the console.
            console.log("ESP New IP:", data.espNewIp);
            setMessage(`✅ Connected! ESP new IP: ${data.espNewIp}`);
            
            // Optionally, store the new IP in localStorage for future use.
            localStorage.setItem('espNewIp', data.espNewIp);
          } else {
            setMessage(`❌ Error: ${data.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage(`❌ Error: ${error.message}`);
        }
      };      
      
    return (
        <div className="bg-black/40 rounded-xl p-8 shadow-lg max-w-md">
            <h2 className="text-white text-xl font-bold mb-6">Connect Robot to WiFi</h2>

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
                        required />
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
                        required />
                </div>
                <Button type="submit">Connect to Robot</Button>
            </form>
            {/* {message && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Response:</h3>
                    <p>{message}</p>
                </div>
            )} */}
        </div>
    );
};

export default ConnectRobotToWifi;