import React, { useState, useEffect } from "react";
import { getStatistics } from "../api/apiService";

const StatasticBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    soldItems: 0,
    unsoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const result = await getStatistics(selectedMonth);
        setStatistics(result);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]); 

  return (
    <div className="statistics-box text-center">
      <h3 className="fs-1 fw-bold">Statistics-<span className="text-danger">{selectedMonth}</span></h3>
      <p className="fs-4 fw-light text-uppercase">
        Total Sales:<span className=""> ₹{statistics.totalSales}</span>
      </p>
      <p className="fs-4 fw-light text-uppercase">
        Sold Items:<span className=""> {statistics.soldItems}</span>
      </p>
      <p className="fs-4 fw-light text-uppercase">
        Unsold Items:<span className=""> {statistics.unsoldItems}</span>
      </p>
    </div>
  );
};

export default StatasticBox;
