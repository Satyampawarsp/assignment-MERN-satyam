import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getPieChartData } from "../api/apiService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const PieChartComponent = ({ selectedMonth }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const result = await getPieChartData(selectedMonth);
        const formattedData = result.map((item) => ({
          name: item._id,
          value: item.count,
        }));
        setPieData(formattedData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieChartData();
  }, [selectedMonth]);

  return (
    <div className="chart-container">
      <h3 className="text-center">Pie Chart for Categories</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
