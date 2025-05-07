import React from 'react';
import MainTable from '../components/MainTable';

const MostOutgoingStocks = () => {
    const stockData = [
        {
            stockId: '02334',
            productName: 'Alpha Smart Sensor',
            route: '12A',
            batchNo: '23434',
            quantity: '200',
            price: '10,000',
            category: 'Electrict',
            temperature: '20',
            weight: '200',
            lightning: '23',
            humidity: '11',
            avarageUsage: '20',
        },
        {
            stockId: '02335',
            productName: 'Omega Lithium Battery',
            route: '5C',
            batchNo: '67452',
            quantity: '12000',
            price: '50,000',
            category: 'Electrict',
            temperature: '12',
            weight: '30,000',
            lightning: '30',
            humidity: '22',
            avarageUsage: '8',
        },
        {
            stockId: '02336',
            productName: 'Xenon LED Panel',
            route: '14D',
            batchNo: '98023',
            quantity: '1500',
            price: '12,000',
            category: 'Electrict',
            temperature: '-20',
            weight: '50,000',
            lightning: '12',
            humidity: '33',
            avarageUsage: '5',
        },
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
        { header: 'QUANTITY', accessor: 'quantity', align: 'center', width: '48px' },
        { header: 'PRICE (LKR)', accessor: 'price', align: 'right', width: '70px' },
        { header: 'CATEGORY', accessor: 'category', align: 'center', width: '55px' },
        { header: 'TEMP (°C)', accessor: 'temperature', align: 'center', width: '48px' },
        { header: 'WEIGHT (KG)', accessor: 'weight', align: 'right', width: '70px' },
        { header: 'LIGHT', accessor: 'lightning', align: 'center', width: '38px' },
        { header: 'HUMIDITY', accessor: 'humidity', align: 'center', width: '48px' },
        { header: 'AVARAGE USAGE', accessor: 'avarageUsage', align: 'center', width: '48px' },
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
                    title="Most Outgoing Stocks"
                    columns={columns}
                    rows={stockData}
                />
            </div>
        </div>
    );
};

export default MostOutgoingStocks;