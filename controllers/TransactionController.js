const Transaction = require("../models/Transaction");
const axios = require("axios");


const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    await Transaction.deleteMany(); 
    await Transaction.insertMany(response.data); 

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding database", error: error.message });
  }
};


const listTransactions = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  try {
    const query = { title: { $regex: search, $options: "i" } }; 
    const transactions = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      transactions,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

   
    const transactions = await Transaction.find({
      dateOfSale: {
        $regex: `-${monthNumber.toString().padStart(2, "0")}-`, // Match month in dateOfSale
      },
    });

    // Calculate statistics
    const totalSales = transactions.reduce((sum, item) => sum + item.price, 0);
    const soldItems = transactions.filter((item) => item.sold).length;
    const unsoldItems = transactions.filter((item) => !item.sold).length;

    res.status(200).json({
      totalSales: totalSales.toFixed(2),
      soldItems,
      unsoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error: error.message });
  }
};


const getBarChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const data = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          price: { $gte: range.min, $lte: range.max },
          dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, "0")}-` },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error: error.message });
  }
};
const getPieChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const categories = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, "0")}-` },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error: error.message });
  }
};
const getDashboardData = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    
    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          price: { $gte: range.min, $lte: range.max },
          dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, "0")}-` },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );

  
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, "0")}-` },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    
    const soldItems = await Transaction.find({ sold: true, dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, "0")}-` } });
    const unsoldItems = await Transaction.find({ sold: false, dateOfSale: { $regex: `-${monthNumber.toString().padStart(2, "0")}-` } });

    const totalSales = soldItems.reduce((sum, item) => sum + item.price, 0);

    res.status(200).json({
      barChartData,
      pieChartData,
      statistics: {
        totalSales: totalSales.toFixed(2),
        soldItems: soldItems.length,
        unsoldItems: unsoldItems.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};



module.exports = { seedDatabase, listTransactions, getStatistics,getBarChartData,getPieChartData ,getDashboardData};
