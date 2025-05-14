import React, { useState, useEffect } from "react";
import axios from "axios";
import MainTable from "../components/MainTable";

const ReOrderTable = () => {
    const [reOrderSuggestions, setReOrderSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReorderSuggestions = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/stock/reorder-suggestions');
                console.log("Reorder suggestions response:", response.data);

                // Add calculated fields to display
                const suggestions = response.data.map(item => ({
                    ...item,
                    // Format the data for display
                    stockId: item.stockId.toString(),
                    calculatedReorderPoint: Math.round(item.calculatedReorderPoint).toString(),
                    // Add a tooltip description showing the calculation
                    calculationDetails: `Reorder Point = ${item.maxDailyUsage} (Max Daily Usage) × ${item.maxLeadTime} (Max Lead Time) = ${item.calculatedReorderPoint}`
                }));

                setReOrderSuggestions(suggestions);
                setError(null);
            } catch (err) {
                console.error('Error fetching reorder suggestions:', err);
                setError('Failed to load reorder suggestions. Please try again later.');

                // If API fails, use mock data as fallback
                setReOrderSuggestions([
                    {
                        stockId: "02334",
                        productName: "Alpha Smart Sensor",
                        route: "12A",
                        quantity: "23434",
                        reOrderLevel: "High",
                        calculatedReorderPoint: "2500",
                        calculationDetails: "Reorder Point = 500 (Max Daily Usage) × 5 (Max Lead Time) = 2500"
                    },
                    {
                        stockId: "02335",
                        productName: "Omega Lithium Battery",
                        route: "5C",
                        quantity: "12000",
                        reOrderLevel: "Medium",
                        calculatedReorderPoint: "840",
                        calculationDetails: "Reorder Point = 210 (Max Daily Usage) × 4 (Max Lead Time) = 840"
                    },
                    {
                        stockId: "02336",
                        productName: "Xenon LED Panel",
                        route: "14D",
                        quantity: "8000",
                        reOrderLevel: "Low",
                        calculatedReorderPoint: "480",
                        calculationDetails: "Reorder Point = 160 (Max Daily Usage) × 3 (Max Lead Time) = 480"
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchReorderSuggestions();
    }, []);

    const columns = [
        { header: "STOCK ID", accessor: "stockId", align: "left" },
        {
            header: "PRODUCT NAME & ROUTE",
            accessor: "productName",
            align: "left",
            render: (value, row) => (
                <div>
                    <div>{value}</div>
                    <div className="text-sm text-gray-400">Route {row.route}</div>
                </div>
            ),
        },
        { header: "CURRENT QUANTITY", accessor: "quantity", align: "left" },
        {
            header: "REORDER POINT",
            accessor: "calculatedReorderPoint",
            align: "left",
            render: (value, row) => (
                <div title={row.calculationDetails}>
                    <div>{value}</div>
                    <div className="text-xs text-gray-400 cursor-help">Hover for calculation</div>
                </div>
            )
        },
        {
            header: "RE ORDER LEVEL",
            accessor: "reOrderLevel",
            align: "left",
            render: (value) => {
                let colorClass = "";
                if (value === "High") colorClass = "text-red-500";
                else if (value === "Medium") colorClass = "text-yellow-500";
                else if (value === "Low") colorClass = "text-green-500";

                return <span className={`font-semibold ${colorClass}`}>{value}</span>;
            },
        },
    ];

    // Show loading state or error if applicable
    if (loading) {
        return <div className="text-white text-center p-4">Loading reorder suggestions...</div>;
    }

    if (error) {
        return (
            <div className="text-white">
                <div className="bg-red-800 p-4 mb-4 rounded">{error}</div>
                <MainTable
                    title="Re-order Suggestions (Mock Data)"
                    columns={columns}
                    rows={reOrderSuggestions}
                />
            </div>
        );
    }

    return (
        <MainTable
            title="Re-order Suggestions"
            columns={columns}
            rows={reOrderSuggestions}
        />
    );
};

export default ReOrderTable;
