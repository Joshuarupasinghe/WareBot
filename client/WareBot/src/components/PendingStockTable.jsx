import React, { useState, useEffect, useRef } from 'react';
import MainTable from './MainTable';

const PendingStockTable = ({ activeStockId }) => {
    const [pendingStock, setPendingStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const firstLoadRef = useRef(true); // Only true on first load

    const fetchPendingStock = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/robot/pending-stocks');
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message = errorData?.message || `An error occurred: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            const filteredSorted = data
                .filter(stock => stock.stockId !== activeStockId)
                .sort((a, b) => new Date(a.fetchedAt) - new Date(b.fetchedAt));

            // Only update state if data actually changed
            const dataString = JSON.stringify(filteredSorted);
            const currentString = JSON.stringify(pendingStock);
            if (dataString !== currentString) {
                setPendingStock(filteredSorted);
            }

            if (firstLoadRef.current) {
                setLoading(false); // Only set loading=false once
                firstLoadRef.current = false;
            }

        } catch (err) {
            console.error('Error fetching pending stock:', err);
            setError('Failed to fetch pending stock. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingStock(); // Initial
        const interval = setInterval(fetchPendingStock, 5000);
        return () => clearInterval(interval);
    }, [activeStockId]);

    const columns = [
        { header: 'Queue Position', accessor: 'qp', align: 'left' },
        { header: 'STOCK ID', accessor: 'stockId', align: 'left' },
        {
            header: 'PRODUCT NAME & Destination',
            accessor: 'productName',
            align: 'left',
            render: (value, row) => (
                <div>
                    <div>{value}</div>
                    <div className="text-sm text-gray-400">Route {row.route}</div>
                </div>
            ),
        },
        { header: 'BATCH NO', accessor: 'batchNo', align: 'center' },
        { header: 'QUANTITY', accessor: 'quantity', align: 'center' },
        { header: 'Origin Location', accessor: 'location', align: 'center' },
        {
            header: 'Requested Task',
            accessor: 'status',
            align: 'center'
        },
        {
            header: 'Requested Time',
            accessor: 'time',
            align: 'center',
            render: (value) => <div dangerouslySetInnerHTML={{ __html: value }} />
        },
    ];

    if (loading) return <div>Loading pending stock...</div>;
    if (error) return <div>Error loading pending stock: {error}</div>;
    if (!pendingStock.length) return <div>No pending stock available.</div>;

    const pendingStockWithQp = pendingStock.map((stock, index) => ({
        ...stock,
        qp: String(index + 1).padStart(2, '0'),
    }));

    return (
        <MainTable
            title="Pending Stock Queue"
            columns={columns}
            rows={pendingStockWithQp}
        />
    );
};

export default PendingStockTable;
