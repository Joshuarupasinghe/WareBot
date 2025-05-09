require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const robotRoutes = require('./routes/robotRoutes');
const userRoutes = require('./routes/userRoutes');
const RobotStatusRoutes = require('./routes/taskRoutes');

const RobotFetchStatusRoutes = require('./routes/robotStatusRoutes')

const stockRoutes = require('./routes/stockRoutes');
const { getStockIdCounter } = require('./controllers/stockController'); // Adjust the path if needed


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

app.use('/api/stock', stockRoutes);  // ✅ CORRECT
app.get('/get-counter', getStockIdCounter); // ✅ This is the GET route for fetching StockId


app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
