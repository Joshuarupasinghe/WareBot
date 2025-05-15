const Robot = require('../models/Robot');
const Stock = require('../models/stock');


// Controller function to send stock route to robot
exports.sendStockRouteToRobot = async (req, res) => {
  const { deviceId } = req.params;
  const { stockId } = req.body;

  // ✅ Step 1: Validate the incoming request
  if (!stockId) {
    console.error('❌ stockId is required.');
    return res.status(400).json({ message: 'stockId is required.' });
  }

  try {
    // ✅ Step 2: Get the Robot by deviceId
    console.log(`🔍 Searching for Robot with deviceId: ${deviceId}`);
    const robot = await Robot.findOne({ deviceId });

    if (!robot || !robot.ip) {
      console.error('❌ Robot not found or IP missing');
      return res.status(404).json({ message: 'Robot not found or IP missing' });
    }
    console.log(`✅ Robot found: ${robot.deviceId} with IP: ${robot.ip}`);

    // ✅ Step 3: Get the Stock by stockId
    console.log(`🔍 Searching for Stock with stockId: ${stockId}`);
    const stock = await Stock.findOne({ stockId: stockId });

    if (!stock || !stock.routeNumber) {
      console.error('❌ Stock not found or routeNumber missing');
      return res.status(404).json({ message: 'Stock not found or routeNumber missing' });
    }
    console.log(`✅ Stock found: ${stock.stockId} with routeNumber: ${stock.routeNumber}`);

    // ✅ Step 4: Prepare the ESP URL and send the request
    const espUrl = `http://${robot.ip}/receive-task`;
    console.log(`🌐 Sending request to ESP: ${espUrl}`);

    const response = await fetch(espUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockId, routeNumber: stock.routeNumber }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ Data sent to robot successfully:`, data);
      res.status(200).json({
        message: 'Data sent to robot successfully',
        espResponse: data,
      });
    } else {
      console.error('❌ Failed to send data to robot:', data);
      res.status(500).json({ message: 'Failed to send data to robot', error: data });
    }
  } catch (error) {
    console.error('❌ Server error while sending data to robot:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
