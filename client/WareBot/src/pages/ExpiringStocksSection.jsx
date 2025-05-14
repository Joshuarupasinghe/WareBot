import React, { useEffect, useState } from "react";
import axios from "axios";
import MainTable from "../components/MainTable";
import { format, differenceInCalendarDays } from "date-fns";

const ExpiringStocksSection = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [range, setRange] = useState("days");

  const fetchExpiringStocks = async (selectedRange) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock/expiring?range=${selectedRange}`);
      setExpiringProducts(response.data);
    } catch (error) {
      console.error("Error fetching expiring products:", error);
    }
  };

  const handleRangeChange = (e) => {
    const selectedRange = e.target.value;
    setRange(selectedRange);
    fetchExpiringStocks(selectedRange);
  };

  useEffect(() => {
    fetchExpiringStocks(range);
  }, [range]);

  const getWeekLabel = (expiryDate) => {
  const today = new Date();
  const diffDays = differenceInCalendarDays(new Date(expiryDate), today);

  if (diffDays >= 0 && diffDays <= 6) return "Week 1";
  if (diffDays >= 7 && diffDays <= 13) return "Week 2";
  if (diffDays >= 14 && diffDays <= 20) return "Week 3";
  if (diffDays >= 21 && diffDays <= 28) return "Week 4";
  return "Future";
};

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
    render: (value, row) => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
        const expiry = new Date(value);
        expiry.setHours(0, 0, 0, 0); // Normalize expiry date

        const formattedDate = format(expiry, 'yyyy-MM-dd');

        // Check if the expiry date is in the past
        const isExpiredOrToday = expiry <= today;
        const textColor = isExpiredOrToday ? "text-red-500" : "text-white";
        return (
          <span className={`${textColor}`}>
            {formattedDate}
          </span>
        );
      } catch (error) {
        return <span className="text-white">{value}</span>;
      }
    },
  },
];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <label htmlFor="range" className="block mb-2 text-md font-medium text-gray-300">
          Filter by Expiry Range:
        </label>
        <select
          id="range"
          value={range}
          onChange={handleRangeChange}
          className="w-52 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-md transition ease-in-out duration-150">
          <option value="days" className="bg-gray-800 text-white">Days</option>
          <option value="weeks" className="bg-gray-800 text-white">Weeks</option>
          <option value="months" className="bg-gray-800 text-white">Months</option>
        </select>
      </div>

      <MainTable
        title="Expiring Products"
        columns={columns}
        rows={expiringProducts}
      />
    </div>
  );
};

export default ExpiringStocksSection;
