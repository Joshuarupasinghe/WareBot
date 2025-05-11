import React, { useEffect, useState } from "react";
import axios from "axios";
import MainTable from "../components/MainTable";
import { format } from 'date-fns'; // Import the format function

const ExpiringStocksSection = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [range, setRange] = useState("days"); // Default range is "days"

  // Fetch expiring stocks from the backend
  const fetchExpiringStocks = async (selectedRange) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/stock/expiring?range=${selectedRange}`
      );
      setExpiringProducts(response.data);
    } catch (error) {
      console.error("Error fetching expiring products:", error);
    }
  };

  // Handle dropdown change
  const handleRangeChange = (e) => {
    const selectedRange = e.target.value;
    setRange(selectedRange);
    fetchExpiringStocks(selectedRange);
  };

  useEffect(() => {
    fetchExpiringStocks(range);
  }, [range]);

  const columns = [
    { header: "STOCK ID", accessor: "StockId", align: "left" },
    {
      header: "PRODUCT NAME & ROUTE",
      accessor: "Name",
      align: "left",
      render: (value, row) => (
        <div>
          <div>{value}</div>
          <div className="text-sm text-gray-400">Route {row.RouteNumber}</div>
        </div>
      ),
    },
    { header: "BATCH NO", accessor: "BatchNumber", align: "center" },
    { header: "QUANTITY", accessor: "Quantity", align: "center" },
    {
      header: "EXPIRY DATE",
      accessor: "ExpiryDate",
      align: "right",
      className: "text-red-500",
      render: (value) => {
        if (value) {
          try {
            const formattedDate = format(new Date(value), 'yyyy-MM-dd');
            return <span>{formattedDate}</span>;
          } catch (error) {
            console.error("Error formatting date:", error);
            return <span>{value}</span>; // Display the original value in case of an error
          }
        }
        return null; // Or handle the case where the date is null/undefined
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <label
          htmlFor="range"
          className="block mb-2 text-md font-medium text-gray-300"
        >
          Filter by Range:
        </label>
        <select
          id="range"
          value={range}
          onChange={handleRangeChange}
          className="w-52 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-md transition ease-in-out duration-150"
        >
          <option value="days" className="bg-gray-800 text-white">Days</option>
          <option value="weeks" className="bg-gray-800 text-white">Weeks</option>
          <option value="months" className="bg-gray-800 text-white">Months</option>
        </select>
      </div>

      <MainTable
        title="Expiring Soon Products"
        columns={columns}
        rows={expiringProducts}
      />
    </div>
  );
};

export default ExpiringStocksSection;