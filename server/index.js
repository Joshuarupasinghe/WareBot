const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive WiFi credentials from the frontend
app.post('/api/configure-wifi', async (req, res) => {
  const { ssid, password, espIp } = req.body;

  try {
    const response = await fetch(`http://${espIp}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ssid, password }),
    });

    const data = await response.json();
    if (response.ok) {
      res.status(200).json({
        message: 'WiFi credentials sent successfully',
        espNewIp: data.ip, // capture the new IP from ESP response
        status: data.status
      });
    } else {
      res.status(500).json({ message: 'Failed to connect to ESP8266', error: data });
    }
  } catch (error) {
    console.error('Error communicating with ESP8266:', error.message);
    res.status(500).json({ message: 'Error communicating with ESP8266', error: error.message });
  }
});



app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
