import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainTable from '../components/MainTable';

const OrderManagementReport = () => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/stock');
                const mappedData = res.data.map(item => {
                    // Example calculations (adjust based on actual logic)
                    const purchaseCost = (parseFloat(item.Quantity) * parseFloat(item.Price)) || 0;
                    const orderingCost = (parseFloat(item.Quantity) * 1000) || 0; // Example fixed ordering cost
                    const holdingCost = (parseFloat(item.Weight) * 50) || 0; // Example cost based on weight
                    
                    // Economic Order Quantity (EOQ) calculation
                    const demandRate = item.OutgoingStock || 0;  // Example: Outgoing stock could represent annual demand
                    const orderingCostPerOrder = 1000;  // Example cost to place an order
                    const holdingCostPerUnit = 50;  // Example holding cost per unit

                    const eoq = Math.sqrt((2 * demandRate * orderingCostPerOrder) / holdingCostPerUnit).toFixed(2);

                    // Reorder Quantity (ROQ) calculation
                    const leadTime = 2;  // Example lead time (in months or periods)
                    const reorderQuantity = (demandRate * leadTime) || 0;

                    return {
                        stockId: item.StockId || '',
                        productName: item.Name || '',
                        route: item.RouteNumber || '',
                        batchNo: item.BatchNumber || '',
                        purchaseCost: purchaseCost.toFixed(2), // formatted
                        orderingCost: orderingCost.toFixed(2), // formatted
                        holdingCost: holdingCost.toFixed(2), // formatted
                        totalInventoryCost: (purchaseCost + orderingCost + holdingCost).toFixed(2),
                        category: item.Category || '',
                        economicOrderQuantity: eoq, // Add EOQ here
                        weight: item.Weight || '',
                        reOrderQuantity: reorderQuantity.toFixed(2) // Add ROQ here
                    };
                });
                setStockData(mappedData);
            } catch (error) {
                console.error("Failed to fetch stock data", error);
            }
        };

        fetchStock();
    }, []);

    const columns = [
        { header: 'STOCK ID', accessor: 'stockId', align: 'left', width: '50px' },
        {
            header: 'PRODUCT NAME & ROUTE',
            accessor: 'productName',
            align: 'left',
            width: '140px',
            render: (value, row) => (
                <div className="text-xs">
                    <div className="text-gray-300">{value}</div>
                    <div className="text-xs text-gray-500">Route {row.route}</div>
                </div>
            ),
        },
        { header: 'BATCH NO', accessor: 'batchNo', align: 'center', width: '55px' },
        { header: 'CATEGORY', accessor: 'category', align: 'center', width: '55px' },
        { header: 'WEIGHT (KG)', accessor: 'weight', align: 'right', width: '70px' },
        { header: 'PURCHASE COST', accessor: 'purchaseCost', align: 'center', width: '48px' },
        { header: 'ORDERING COST', accessor: 'orderingCost', align: 'center', width: '55px' },
        { header: 'HOLDING COST', accessor: 'holdingCost', align: 'center', width: '55px' },
        { header: 'TOTAL INVENTORY COST', accessor: 'totalInventoryCost', align: 'right', width: '70px' },
        { header: 'ECONOMIC ORDER QUANTITY', accessor: 'economicOrderQuantity', align: 'center', width: '48px' },
        { header: 'REORDER QUANTITY', accessor: 'reOrderQuantity', align: 'center', width: '38px' },
    ];

    const totalColumnWidth = columns.reduce((sum, column) => sum + parseInt(column.width || 100, 10), 0);

    const tableStyles = `
        .custom-table-wrapper th {
            font-size: 0.7rem;
            color: #94a3b8;
            padding-top: 18px;
            padding-bottom: 18px;
            font-weight: normal;
            padding-left: 10px;
            padding-right: 10px;
        }
        .custom-table-wrapper td {
            font-size: 0.7rem;
            color: #cbd5e1;
            padding-top: 18px;
            padding-bottom: 18px;
            padding-left: 10px;
            padding-right: 10px;
        }
        .custom-table-wrapper table {
            line-height: 2;
            border-spacing: 4;
        }
        .custom-table-wrapper table td,
        .custom-table-wrapper table th {
            border-spacing: 4;
        }
    `;

    return (
        <div className="w-full overflow-x-auto">
            <style>{tableStyles}</style>
            <div style={{ minWidth: `${totalColumnWidth + 10}px` }} className="custom-table-wrapper">
                <MainTable
                    title="Order Management Report"
                    columns={columns}
                    rows={stockData}
                />
            </div>
        </div>
    );
};

export default OrderManagementReport;
