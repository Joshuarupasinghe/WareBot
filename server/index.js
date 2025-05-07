require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const robotRoutes = require('./routes/robotRoutes');
const userRoutes = require('./routes/userRoutes');
const RobotStatusRoutes = require('./routes/taskRoutes');

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

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
