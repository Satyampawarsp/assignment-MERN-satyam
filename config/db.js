const mongoose = require("mongoose");
require("dotenv").config();

const dbconnections = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

module.exports = dbconnections;
