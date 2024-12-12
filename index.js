const express = require("express");
const dbConnection = require("./config/db");
const transactionRoutes = require("./routes/TransactionRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());  

// Middleware
app.use(express.json());

// Database Connection
dbConnection();

// Routes
app.use("/api/transactions", transactionRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Transactions API");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
