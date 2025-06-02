const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables based on environment
if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config();
}

const connectDB = async() => {
    const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/stratify";

    try{
        const conn = await mongoose.connect(mongoURI);
        // const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDb Connected:${conn.connection.host}`);
    }
    catch(error)
    {
        console.error(error);
        process.exit(1);
    }
}

module.exports = { connectDB };
