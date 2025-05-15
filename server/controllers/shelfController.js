// controllers/shelfController.js
import Shelf from '../models/Shelf.js';

// 1) Forward SSID/password to the Shelf ESP
export const configureShelfDevice = async (req, res) => {
  const { ssid, password, espIp } = req.body;
  if (!ssid || !password || !espIp) {
    return res.status(400).json({ message: 'Missing ssid, password, or espIp' });
  }

  try {
    const response = await fetch(`http://${espIp}/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssid, password })
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({ message: 'ESP connection failed', error: data });
    }

    res.status(200).json({ message: 'Device configured', deviceIp: data.ip });
  } catch (err) {
    console.error('Error configuring device:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 2) Receive shelve readings & upsert into history
export const addShelfSpace = async (req, res) => {
  try {
    const { deviceId, height, length } = req.body;
    if (!deviceId || height == null || length == null) {
      return res
        .status(400)
        .json({ message: 'deviceId, height and length are required' });
    }

    const space = height * length;
    const now = new Date();

    const shelfDoc = await Shelf.findOneAndUpdate(
      { deviceId },
      {
        deviceId,
        ip:     req.ip,
        lastHeartbeat: now,
        $push: {
          readings: { height, length, space, timestamp: now }
        }
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: 'Shelf space recorded', data: shelfDoc });
  } catch (err) {
    console.error('Error saving shelf space:', err);
    res.status(500).json({ message: 'Error saving shelf space', error: err.message });
  }
};

// 3) Receive heartbeat / IP update
export const updateShelfIp = async (req, res) => {
  try {
    const { deviceId, ip } = req.body;
    if (!deviceId || !ip) {
      return res.status(400).json({ message: 'Missing deviceId or IP' });
    }
    const shelf = await Shelf.findOneAndUpdate(
      { deviceId },
      { ip, lastHeartbeat: new Date() },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'IP updated', shelf });
  } catch (err) {
    console.error('Error in updateShelfIp:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
