import React from 'react';
import MainTable from '../components/MainTable';

const OrderManagementReport = () => {
    const stockData = [
        { stockId: '02334', productName: 'Alpha Smart Sensor', route: '12A', batchNo: '23434', purchaseCost: '5,000', orderingCost: '10,000', holdingCost: '3,000', totalInventoryCost: '18,000', category: 'Electrict', economicOrderQuantity: '20',  weight: '200', reOrderQuantity: '2000' },
        { stockId: '02335', productName: 'Omega Lithium Battery', route: '5C', batchNo: '67452', purchaseCost: '30,000', orderingCost: '50,000', holdingCost: '10,000', totalInventoryCost: '90,000', category: 'Electrict', economicOrderQuantity: '10', weight: '30,000', reOrderQuantity: '1000' },
        { stockId: '02336', productName: 'Xenon LED Panel', route: '14D', batchNo: '98023', purchaseCost: '4,000', orderingCost: '12,000', holdingCost: '5,000', totalInventoryCost: '21,000', category: 'Electrict', economicOrderQuantity: '40', weight: '50,000', reOrderQuantity: '50' },
        { stockId: '02337', productName: 'Vertex Cooling Fan', route: '3E', batchNo: '45321', purchaseCost: '40,000', orderingCost: '100,000', holdingCost: '15,000', totalInventoryCost: '155,000', category: 'Electrict', economicOrderQuantity: '20', weight: '200,000', reOrderQuantity: '60' },
        { stockId: '02338', productName: 'Delta Hydraulic Pump', route: '7F', batchNo: '56234', purchaseCost: '54,000', orderingCost: '500,000', holdingCost: '40,000', totalInventoryCost: '594,000', category: 'Mechanic', economicOrderQuantity: '12', weight: '400,000', reOrderQuantity: '80' },
        { stockId: '02339', productName: 'Fusion Thermal Insulator', route: '8J', batchNo: '89654', purchaseCost: '60,000', orderingCost: '700,000', holdingCost: '66,000', totalInventoryCost: '826,000', category: 'Mechanic', economicOrderQuantity: '22', weight: '12,000', reOrderQuantity: '500' }
    ];

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

    // Calculate the approximate total width of the columns
    const totalColumnWidth = columns.reduce((sum, column) => sum + parseInt(column.width || 100, 10), 0);

    // Custom styles to override the table
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