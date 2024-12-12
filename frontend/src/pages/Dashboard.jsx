import React from "react";
import TransactionsTable from "../components/TransactionsTable";
import StatasticBox from "../components/StatasticsBox";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChart";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = React.useState("March");

  const monthsData = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="container-fluid  mt-0 pt-0">
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center">
          <h1 className="mt-3 text-center p-3 mb-5 text-white bg-dark w-50">TRANSACTION STATISTICS</h1>
        </div>

        <div className="col-lg-6 mt-5">
          <label htmlFor="month" className="form-label fw-bold fs-1">
            Select Month:
          </label>
          <select
            id="month"
            className="form-select mb-4 w-50 text-danger"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthsData.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-6">
          <StatasticBox selectedMonth={selectedMonth} />
        </div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <BarChartComponent selectedMonth={selectedMonth} />
          </div>
          <div className="col-lg-6">
            <PieChartComponent selectedMonth={selectedMonth} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <TransactionsTable selectedMonth={selectedMonth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
