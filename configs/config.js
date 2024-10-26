require("dotenv").config();

module.exports = {
  port: process.env.PORT || 9999,
  dbUrl: process.env.MONGO_URI || "mongodb://localhost:27017",
  dbName: process.env.DB_NAME || "SDN302_PE_TEST",
};
