const express = require('express');
const connectDB = require('./config/db'); // Import the connection logic
const cors = require('cors');
require('dotenv').config(); // Import the "Safe" for passwords

const app = express();

// Connect to Database
connectDB();

// Init Middleware (Allows us to read JSON data)
app.use(cors());
app.use(express.json());
// Define the entry point for all post-related API doors
app.use('/api/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello! The Lost & Found Backend is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});