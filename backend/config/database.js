const mongoose = require("mongoose");
const { DB_URL } = require("../constants/constants");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
