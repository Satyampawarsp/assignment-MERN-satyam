import React, { useState, useEffect } from "react";
import { getTransactions } from "../api/apiService"; 

const TransactionsTable = ({ selectedMonth }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    
    const fetchTransactions = async () => {
      try {
        const result = await getTransactions(search, currentPage, itemsPerPage);
        setData(result.transactions); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [search, selectedMonth, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="transactions-table">
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3 w-50"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>_Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>₹{item.price}</td>
              <td>{item.category}</td>
              <td>{item.sold ? "Yes" : "No"}</td>
              <td>
                <img src={item.images} alt={item.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Page No : {currentPage}
        </button>
        <span>Previous-Next</span>
        <button
          className="btn btn-primary"
          disabled={indexOfLastItem >= data.length}
          onClick={() =>
            setCurrentPage((prev) => (indexOfLastItem < data.length ? prev + 1 : prev))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
