const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 1. Try to connect to the database using the Key from your .env file
        await mongoose.connect(process.env.MONGO_URI);
        
        // 2. If successful, print this message
        console.log('MongoDB Connected...');
    } catch (err) {
        // 3. If it fails, print the error and stop the server
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;