// seedRobotStatus.js
const mongoose = require('mongoose');
const RobotStatus = require('./models/RobotStatus');

// Replace with your actual MongoDB URI
const MONGODB_URI = 'mongodb+srv://joshuajrupasinghe:YROpoH8ssUFIAAeY@cluster0.8kqzknz.mongodb.net/WareBot?retryWrites=true&w=majority&appName=Cluster0'; // Or your cloud URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');

    // Sample seed data
    const sampleData = {
      deviceId: 'robot001',
      stockId: '9',
      status: 'Fetching',
      fetchedAt: new Date()
    };

    return RobotStatus.create(sampleData);
  })
  .then((doc) => {
    console.log('Seeded RobotStatus:', doc);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });
