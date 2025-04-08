import React, { useState } from 'react';
import TextField from './TextField';
import Button from './Button';

const ConnectRobotToWifi = () => {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Submit handler for sending credentials to the ESP8266.
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Typically, when ESP8266 runs in AP mode, it uses IP 192.168.4.1.
        const espUrl = 'http://192.168.4.1/connect';
        const payload = { ssid, password };

        try {
            const response = await fetch(espUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Connection failed with status ${response.status}`);
            }

            const data = await response.json();
            setMessage(`Success: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error("Error:", error);
            setMessage(`Error: ${error.message}`);
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
            {message && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Response:</h3>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default ConnectRobotToWifi;