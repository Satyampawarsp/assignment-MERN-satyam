import axios from "axios";
const API_URL = "http://localhost:8000/api/transactions";


export const getTransactions = async (search = "", page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}?search=${search}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};


export const getStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/statistics?month=${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};



export const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/bar-chart?month=${month}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export const getPieChartData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/pie-chart?month=${month}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};
