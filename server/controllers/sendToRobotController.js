const Robot = require('../models/Robot');
const Stock = require('../models/stock');

exports.sendStockRouteToRobot = async (req, res) => {
  const { deviceId } = req.params;
  const { stockId } = req.body;

  // Check if stockId is provided
  if (!stockId) {
    return res.status(400).json({ message: 'stockId is required.' });
  }

  try {
    // 1. Get robot by deviceId and retrieve its IP
    const robot = await Robot.findOne({ deviceId });
    if (!robot || !robot.ip) {
      return res.status(404).json({ message: 'Robot not found or IP missing' });
    }

    // 2. Get stock by stockId and retrieve the routeNumber
    const stock = await Stock.findOne({ stockId });
    if (!stock || !stock.routeNumber) {
      return res.status(404).json({ message: 'Stock not found or routeNumber missing' });
    }

    
    const espUrl = `http://${robot.ip}/receive-task`;

    
    const response = await fetch(espUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockId, routeNumber: stock.routeNumber }),
    });

    
    const data = await response.json();

    if (response.ok) {
      
      res.status(200).json({
        message: 'Data sent to robot successfully',
        espResponse: data,
      });
    } else {
      
      res.status(500).json({ message: 'Failed to send data to robot', error: data });
    }
  } catch (error) {
    
    console.error('Error sending data to robot:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
