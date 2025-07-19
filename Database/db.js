const mongoose = require("mongoose");
require("dotenv").config();
const MongoURL = process.env.MongoURL || "mongodb://localhost:27017/dhruvin"


const connectDB = async () => {
    try {
        await mongoose.connect(MongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("🟢 MongoDB Connected Successfully");
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error.message);
    }
};

module.exports = connectDB;
