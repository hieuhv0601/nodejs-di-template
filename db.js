const mongoose = require("mongoose");
const config = require("./configs/config");

async function connectToDb() {
  try {
    // Connecting to MongoDB using Mongoose
    await mongoose.connect(config.dbUrl, {
      dbName: config.dbName,
    });
    console.log("Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { connectToDb };
