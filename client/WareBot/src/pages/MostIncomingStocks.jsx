import React, { useState, useEffect } from 'react';
import MainTable from '../components/MainTable';
import axios from 'axios';

const MostIncomingStocks = () => {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncomingAverages = async () => {
            // Clear any previous errors
            setError(null);
            setLoading(true);
            
            try {
                // Use direct URL to the backend API
                const response = await axios.get('http://localhost:5000/api/incoming-average/top');
                
                console.log('API Response:', response.data); // Debug the response
                
                // Check if the response data is valid
                if (!response.data) {
                    throw new Error('No data received from API');
                }
                
                // Make sure we're working with an array
                const dataArray = Array.isArray(response.data) ? response.data : 
                                 (response.data.data ? response.data.data : []);
                
                // Transform the API data to match the table structure
                const formattedData = dataArray.map(item => ({
                    productName: item.productName || 'Unknown Product',
                    incomingAverage: item.incomingAverage ? item.incomingAverage.toString() : '0',
                    dateTime: item.dateTime ? new Date(item.dateTime).toLocaleString() : 'N/A',
                    temperature: item.temperature || 'N/A',
                    humidity: item.humidity || 'N/A',
                    lightning: item.lightning || 'N/A'
                }));
                
                setStockData(formattedData);
            } catch (error) {
                console.error('Error fetching incoming averages:', error);
                
                // More detailed error handling
                if (error.response) {
                    console.error('Error data:', error.response.data);
                    console.error('Error status:', error.response.status);
                    setError(`Server error: ${error.response.status}`);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    setError('No response from server. Check backend connection.');
                } else {
                    console.error('Error message:', error.message);
                    setError(`Error: ${error.message}`);
                }
                
                // Fallback to mock data if API fails
                setStockData([
                    {
                        productName: 'Delta Flux Capacitor',
                        incomingAverage: '180',
                        dateTime: new Date().toLocaleString(),
                        temperature: '21',
                        humidity: '25',
                        lightning: '95'
                    },
                    {
                        productName: 'Gamma Power Supply',
                        incomingAverage: '156',
                        dateTime: new Date().toLocaleString(),
                        temperature: '24',
                        humidity: '40',
                        lightning: '82'
                    },
                    {
                        productName: 'Beta Circuit Controller',
                        incomingAverage: '142',
                        dateTime: new Date().toLocaleString(),
                        temperature: '25',
                        humidity: '55',
                        lightning: '72'
                    },
                    {
                        productName: 'Zeta Thermal Module',
                        incomingAverage: '128',
                        dateTime: new Date().toLocaleString(),
                        temperature: '29',
                        humidity: '80',
                        lightning: '38'
                    },
                    {
                        productName: 'Epsilon Data Hub',
                        incomingAverage: '115',
                        dateTime: new Date().toLocaleString(),
                        temperature: '22',
                        humidity: '35',
                        lightning: '89'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchIncomingAverages();
    }, []);

    // Define columns based on our new data structure
    const columns = [
        {
            header: 'PRODUCT NAME',
            accessor: 'productName',
            align: 'left',
            width: '150px'
        },
        {
            header: 'INCOMING AVERAGE',
            accessor: 'incomingAverage',
            align: 'center',
            width: '100px'
        },
        {
            header: 'DATE & TIME',
            accessor: 'dateTime',
            align: 'center',
            width: '150px'
        },
        {
            header: 'TEMP (°C)',
            accessor: 'temperature',
            align: 'center',
            width: '70px'
        },
        {
            header: 'HUMIDITY (%)',
            accessor: 'humidity',
            align: 'center',
            width: '80px'
        },
        {
            header: 'LIGHTNING',
            accessor: 'lightning',
            align: 'center',
            width: '80px'
        }
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
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p><strong>Error:</strong> {error}</p>
                        <p className="text-sm">Using mock data instead.</p>
                    </div>
                )}
                <MainTable
                    title="Most Incoming Stocks (Top 5 Frequency)"
                    columns={columns}
                    rows={stockData}
                    loading={loading}
                    emptyMessage="No incoming stock data available"
                />
            </div>
        </div>
    );
};

export default MostIncomingStocks;