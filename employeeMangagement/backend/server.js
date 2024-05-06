require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employees');  // Import routes for employees

const app = express();
const PORT = process.env.PORT || 5000;  // Use port from environment or default to 5000

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));  // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // Parse application/json

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))  // Successful connection
.catch(err => console.error('Could not connect to MongoDB...', err));  // Error handling

// Route handling
app.use('/api', employeeRoutes);  // Use employee routes under the "/api" route prefix

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
