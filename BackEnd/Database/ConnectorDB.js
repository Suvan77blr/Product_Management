const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables based on environment
if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config();
}

const connectDB = async () => {
   const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/stratify";
    try {
        const conn = await mongoose.connect(mongoURL, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = { connectDB };
