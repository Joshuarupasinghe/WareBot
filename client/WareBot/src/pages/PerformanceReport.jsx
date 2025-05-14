import React from 'react';
import MainTable from '../components/MainTable';

const PerformanceReport = () => {
    const expiringProducts = [
        {
            StockExpiryID: "334",
            LongStockCount: "200",
            Month: "January",
            StockInflowRate: "20%",
            StockOutflowRate: "10%",
            AnalyticsReports: "2",
            AccessMonitoring: "5"
        },
        {
            StockExpiryID: "335",
            LongStockCount: "10",
            Month: "February",
            StockInflowRate: "4%",
            StockOutflowRate: "29%",
            AnalyticsReports: "3",
            AccessMonitoring: "3"
        },
    ];

    const columns = [
        { header: 'Stock Expiry Warnings Issued ID', accessor: 'StockExpiryID', align: 'left', width: '50px' },
        {
            header: 'Long-Term Stock Count',
            accessor: 'LongStockCount',
            align: 'left',
            width: '140px',
            render: (value, row) => (
                <div className="text-xs">
                    <div className="text-gray-300">{value}</div>
                    <div className="text-xs text-gray-500">Month {row.Month}</div>
                </div>
            ),
        },
        { header: 'Stock Inflow Rate', accessor: 'StockInflowRate', align: 'center', width: '48px' },
        { header: 'Stock Outflow Rate', accessor: 'StockOutflowRate', align: 'right', width: '70px' },
        { header: 'Analytics Reports Generated', accessor: 'AnalyticsReports', align: 'center', width: '55px' },
        { header: 'Security and Access Monitoring', accessor: 'AccessMonitoring', align: 'center', width: '48px' },
    ];

    return (
        <MainTable
            title="Performance Report"
            columns={columns}
            rows={expiringProducts}

        />
    );
};

export default PerformanceReport;