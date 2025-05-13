import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainTable from '../components/MainTable';

const PerformanceReport = () => {
    const [expiringProducts, setExpiringProducts] = useState([]);

    // Define columns for the table
    const columns = [
        { header: 'Stock Expiry Warnings', accessor: 'StockExpiryWarning', align: 'left', width: '50%' },
        { header: 'Expiry Date', accessor: 'ExpiryDate', align: 'left', width: '50%' },
        { header: 'Stock Inflow Rate', accessor: 'StockInflowRate', align: 'right', width: '50%' },
        { header: 'Stock Outflow Rate', accessor: 'StockOutflowRate', align: 'right', width: '50%' },
    ];

    useEffect(() => {
        const fetchPerformanceReport = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/performance-report');
                setExpiringProducts(response.data);
            } catch (error) {
                console.error('Error fetching performance report:', error);
            }
        };

        fetchPerformanceReport();
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Performance Report</h1>
            <MainTable columns={columns} rows={expiringProducts} />
        </div>
    );
};

export default PerformanceReport;