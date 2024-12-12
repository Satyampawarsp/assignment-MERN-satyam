import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { getBarChartData } from "../api/apiService";

const BarChartComponent = ({ selectedMonth }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const result = await getBarChartData(selectedMonth); 
        setBarData(result);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  return (
    <div className="chart-container">
      <h3 className="text-center">Bar Chart Stats -<span className="text-danger">{selectedMonth}</span></h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" label={{ value: "Price Range", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
