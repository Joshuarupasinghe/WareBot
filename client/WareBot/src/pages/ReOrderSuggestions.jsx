import React from "react";
import MainTable from "../components/MainTable";

const ReOrderTable = () => {
    const ReOrderSuggestions = [
        {
            stockId: "02334",
            productName: "Alpha Smart Sensor",
            route: "Route 12A",
            quantity: "23434",
            reOrderLevel: "High",
        },
        {
            stockId: "02335",
            productName: "Omega Lithium Battery",
            route: "5C",
            quantity: "12000",
            reOrderLevel: "Medium",
        },
        {
            stockId: "02336",
            productName: "Xenon LED Panel",
            route: "14D",
            quantity: "8000",
            reOrderLevel: "Low",
        },
        {
            stockId: "02337",
            productName: "Vertex Cooling Fan",
            route: "3E",
            quantity: "9400",
            reOrderLevel: "Low",
        },
        {
            stockId: "02338",
            productName: "Delta Hydraulic Pump",
            route: "7F",
            quantity: "17600",
            reOrderLevel: "Medium",
        },
        {
            stockId: "02339",
            productName: "Fusion Thermal Insulator",
            route: "8J",
            quantity: "20100",
            reOrderLevel: "High",
        },
    ];

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
            header: "RE ORDER LEVEL",
            accessor: "reOrderLevel",
            align: "left",
            render: (value) => {
                let colorClass = "";
                if (value === "High") colorClass = "text-green-500";
                else if (value === "Medium") colorClass = "text-yellow-500";
                else if (value === "Low") colorClass = "text-red-500";

                return <span className={`font-semibold ${colorClass}`}>{value}</span>;
            },
        },
    ];

    return (
        <MainTable
            title="Re-order Suggestions"
            columns={columns}
            rows={ReOrderSuggestions}
        />
    );
};

export default ReOrderTable;
