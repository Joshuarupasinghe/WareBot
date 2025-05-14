const Stock = require('../models/stock');
const IncomingAverage = require('../models/incomingAverage');

// Calculate and store incoming averages from stock data
exports.calculateIncomingAverages = async (req, res) => {
  try {
    // Get all stocks
    const stocks = await Stock.find();
    
    // Process stocks to calculate averages
    // Group by product name
    const productGroups = {};
    
    stocks.forEach(stock => {
      const productName = stock.Name;
      if (!productGroups[productName]) {
        productGroups[productName] = {
          count: 0,
          totalTemperature: 0,
          totalHumidity: 0,
          totalLighting: 0
        };
      }
      
      productGroups[productName].count += 1;
      productGroups[productName].totalTemperature += parseFloat(stock.Temperature) || 0;
      productGroups[productName].totalHumidity += parseFloat(stock.Humidity) || 0;
      productGroups[productName].totalLighting += parseFloat(stock.Lighting) || 0;
    });
    
    // Create or update IncomingAverage documents
    const updatePromises = Object.keys(productGroups).map(async (productName) => {
      const group = productGroups[productName];
      const incomingAverage = group.count;
      const avgTemperature = (group.totalTemperature / group.count).toFixed(2);
      const avgHumidity = (group.totalHumidity / group.count).toFixed(2);
      const avgLighting = (group.totalLighting / group.count).toFixed(2);
      
      return IncomingAverage.findOneAndUpdate(
        { productName },
        { 
          incomingAverage,
          temperature: avgTemperature,
          humidity: avgHumidity,
          lightning: avgLighting,
          dateTime: new Date()
        },
        { upsert: true, new: true }
      );
    });
    
    await Promise.all(updatePromises);
    
    res.status(200).json({ message: 'Incoming averages calculated and stored successfully' });
  } catch (error) {
    console.error('Error calculating incoming averages:', error);
    res.status(500).json({ error: 'Server error while calculating incoming averages' });
  }
};

// Get top 5 most frequent incoming averages
exports.getTopIncomingAverages = async (req, res) => {
  try {
    const topAverages = await IncomingAverage.find()
      .sort({ incomingAverage: -1 }) // Sort by incomingAverage in descending order
      .limit(5); // Get only top 5
    
    res.status(200).json(topAverages);
  } catch (error) {
    console.error('Error fetching top incoming averages:', error);
    res.status(500).json({ error: 'Server error while fetching top incoming averages' });
  }
};