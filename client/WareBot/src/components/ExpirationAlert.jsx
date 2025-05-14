import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExpirationAlert() {
  const [expiringStocks, setExpiringStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dismissedProducts, setDismissedProducts] = useState([]);

  useEffect(() => {
    const fetchExpiringStocks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stock/expiring?range=days");
        setExpiringStocks(response.data);
      } catch (error) {
        console.error("Error fetching expiring stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpiringStocks();
  }, []);

  const calculateTimeLeft = (expiryDate) => {
    const now = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - now;

    if (timeDifference <= 0) {
      return { isExpired: true, timeLeft: 0 };
    } else {
      const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return { isExpired: false, timeLeft: daysLeft };
    }
  };

  const handleViewDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/stock/${id}`);
    setSelectedProduct(response.data); // Update state with the product details
  } catch (error) {
    console.error("Error fetching stock details:", error.response ? error.response.data : error.message);
  }
};

  const handleDismiss = (productId) => {
    setDismissedProducts((prev) => [...prev, productId]);
  };

  const filterExpiringStocks = (stocks) => {
    return stocks.filter((stock) => {
      const { timeLeft } = calculateTimeLeft(stock.ExpiryDate);
      return timeLeft === 3;
    });
  };

  const filteredStocks = filterExpiringStocks(expiringStocks);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 relative">
      <h1 className="text-white text-4xl font-bold text-center mb-6 font-poppins">Expiration Alert!</h1>

      {isLoading ? (
        <p className="text-white text-md font-poppins">Loading expiring stocks...</p>
      ) : (
        filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => {
            if (dismissedProducts.includes(stock.StockId)) return null;

            const { isExpired, timeLeft } = calculateTimeLeft(stock.ExpiryDate);

            return (
              <div key={stock.StockId} className={`${isExpired ? "bg-red-500" : "bg-white/40 backdrop-blur-lg"} p-8 shadow-lg w-[700px] mb-6 rounded-lg`}>
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-black text-lg font-bold w-32 font-poppins">Product:</span>
                    <span className="bg-blue-200 px-10 py-1 rounded-md text-black font-semibold text-lg">
                      {stock.Name}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="bg-blue-200/60 px-5 py-2 rounded-full text-black bg-blue-600 hover:bg-[#042a49] text-white text-md font-medium font-poppins"
                      onClick={() => handleViewDetails(stock.StockId)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-blue-200/60 px-5 py-2 rounded-full text-black bg-gray-500 hover:bg-gray-600 text-white text-md font-medium font-poppins"
                      onClick={() => handleDismiss(stock.StockId)}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <span className="text-black text-lg font-bold w-32 font-poppins">Expiring In:</span>
                  <span className={`${isExpired ? "bg-red-700 text-white" : "bg-blue-200 text-black"} px-10 py-1 rounded-md font-semibold`}>
                    {isExpired ? <span className="text-white font-bold">Expired</span> : <span className="text-red-600 font-bold text-lg">{timeLeft} days</span>}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-white text-md font-poppins">No products expiring in the next 3 days.</p>
        )
      )}

      {/* Modal for View Details */}
    {selectedProduct && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px] max-w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 font-poppins">Product Details</h2>

      <div className="space-y-2 text-gray-800 text-base">
      <p><strong>Stock ID:</strong> {selectedProduct.StockId}</p>
      <p><strong>Name:</strong> {selectedProduct.Name}</p>
      <p><strong>Category:</strong> {selectedProduct.Category}</p>
      <p><strong>Price:</strong> ${selectedProduct.Price}</p>
      <p><strong>Quantity:</strong> {selectedProduct.Quantity}</p>
      <p><strong>BatchNumber:</strong> {selectedProduct.BatchNumber}</p>
      <p><strong>Route Number:</strong> {selectedProduct.RouteNumber}</p>
      <p><strong>Temperature:</strong> {selectedProduct.Temperature}</p>
      <p><strong>Weight:</strong> {selectedProduct.Weight}</p>
      <p><strong>Lighting:</strong> {selectedProduct.Lighting}</p>
      <p><strong>Humidity:</strong> {selectedProduct.Humidity}</p>

      <div className="flex justify-center mt-6">
  <button
    onClick={() => setSelectedProduct(null)}
    className="bg-red-500 hover:bg-red-600 text-white font-semibold font-poppins font-lg px-10 py-2 rounded-lg shadow transition duration-200 ease-in-out"
  >
    Close
  </button>
</div>

    </div>
  </div>
   </div>
)}

    </div>
  );
}
