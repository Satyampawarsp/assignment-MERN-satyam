const express = require("express");
const { seedDatabase, listTransactions, getStatistics,getBarChartData,getPieChartData,getDashboardData } = require("../controllers/TransactionController");

const router = express.Router();

router.get("/seed", seedDatabase);
router.get("/", listTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChartData);
router.get("/pie-chart", getPieChartData);
router.get("/dashboard-data", getDashboardData);


module.exports = router;
