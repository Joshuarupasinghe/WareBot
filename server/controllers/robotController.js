// controllers/robotController.js
const Robot = require('../models/Robot');

exports.configureWifi = async (req, res) => {
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

}

// Update IP and heartbeat endpoint
exports.updateIp = async (req, res) => {
  try {
    const { deviceId, ip } = req.body;
    if (!deviceId || !ip) {
      return res.status(400).json({ message: 'Missing deviceId or IP' });
    }
    // Update (or create) the robot document:
    const robot = await Robot.findOneAndUpdate(
      { deviceId },
      { ip, lastHeartbeat: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Device IP updated successfully', robot });
  } catch (err) {
    console.error('Error in updateIp: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get device status (IP and online/offline status)
exports.getDeviceStatus = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const robot = await Robot.findOne({ deviceId });
    if (!robot) {
      return res.status(404).json({ message: 'Device not found' });
    }
    // Define online as having a heartbeat within the last 60 seconds
    const online = (new Date() - new Date(robot.lastHeartbeat)) / 1000 < 60;
    res.status(200).json({
      deviceId: robot.deviceId,
      ip: robot.ip,
      online,
      lastHeartbeat: robot.lastHeartbeat,
    });
  } catch (err) {
    console.error('Error in getDeviceStatus: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.recordTemperature = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { value, timestamp } = req.body;
    if (typeof value !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing `value`' });
    }

    const reading = {
      value,
      timestamp: timestamp ? new Date(timestamp) : new Date()
    };

    const robot = await Robot.findOneAndUpdate(
      { deviceId },
      { 
        $push: { temperatureReadings: reading },
        $set: { lastHeartbeat: new Date() }
      },
      { new: true, runValidators: true }
    );

    if (!robot) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(201).json({ message: 'Reading recorded', reading });
  } catch (err) {
    console.error('Error in recordTemperature:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get temperature
exports.getAverageTemperature = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const robot = await Robot.findOne({ deviceId });

    if (!robot) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const temperatures = robot.temperatureReadings.map((reading) => reading.value) || [];
    if (temperatures.length === 0) {
      return res.status(200).json({ averageTemperature: null });
    }

    const averageTemperature =
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

    res.status(200).json({ averageTemperature });
  } catch (err) {
    console.error('Error in getAverageTemperature: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendStockToRobot = async (req, res) => {
  const { stockId, routeNumber } = req.body;

  if (!stockId || !routeNumber) {
    return res.status(400).json({ message: '❌ Stock ID and Route Number are required.' });
  }

  try {
    // 🔍 Find the robot's IP address in the database
    const robot = await Robot.findOne({ deviceId: 'robot001' });

    if (!robot) {
      return res.status(404).json({ message: '❌ Robot not found.' });
    }

    const robotIp = robot.ip;

    if (!robotIp) {
      return res.status(500).json({ message: '❌ Robot IP address not configured.' });
    }

    // 🌐 Send data to the robot
    const response = await fetch(`http://${robotIp}/send-stock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stockId, routeNumber }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({
        message: '✅ Stock data sent to robot successfully!',
        status: data.status,
      });
    } else {
      return res.status(500).json({
        message: '❌ Failed to send stock data to robot.',
        error: data,
      });
    }
  } catch (error) {
    console.error('Error sending stock to robot:', error.message);
    return res.status(500).json({
      message: '❌ Error communicating with robot.',
      error: error.message,
    });
  }
};