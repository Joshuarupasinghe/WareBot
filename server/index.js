require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const robotRoutes = require('./routes/robotRoutes');
const userRoutes = require('./routes/userRoutes');
const RobotStatusRoutes = require('./routes/taskRoutes');
const RobotFetchStatusRoutes = require('./routes/robotStatusRoutes');
const stockRoutes = require('./routes/stockRoutes');
const { addStock, getStock, getStockIdCounter, getAllStocks, getExpiringStocks } = require('./controllers/stockController');




const robotSendRoutes = require('./routes/robotSendRoute');


const incomingAverageRoutes = require('./routes/incomingAverageRoutes');
const { calculateIncomingAverages } = require('./controllers/incomingAverageController');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', robotRoutes);
app.use('/api/users', userRoutes);
app.use('/api', RobotStatusRoutes);
app.use('/api/robot', RobotFetchStatusRoutes);

app.use('/api/stock', stockRoutes);
app.get('/get-counter', getStockIdCounter);
  

app.use('/api', robotSendRoutes);


app.use('/api/stock', stockRoutes);
app.use('/api/incoming-average', incomingAverageRoutes);  // New route for incoming averages



app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start the server and then run the calculation
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Auto-calculate incoming averages on server start
  console.log('Starting initial calculation of incoming averages...');
  
  // Create mock req and res objects for the controller function
  const req = {};
  const res = {
    status: function(statusCode) {
      console.log(`Calculation status: ${statusCode}`);
      return {
        json: function(data) {
          console.log('Calculation result:', data.message || data);
        }
      };
    }
  };
  
  // Run the calculation
  calculateIncomingAverages(req, res)
    .then(() => {
      console.log('✅ Initial incoming average calculation completed successfully');
    })
    .catch(error => {
      console.error('❌ Error in initial calculation:', error);
    });
});