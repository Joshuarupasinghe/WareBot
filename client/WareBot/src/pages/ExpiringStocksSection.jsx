import React from 'react';
import MainTable from '../components/MainTable';

const ExpiringStocksSection = () => {
    const expiringProducts = [
        {
            stockId: '02335',
            productName: 'Omega Lithium Battery',
            route: '5C',
            batchNo: '67452',
            quantity: '12000',
            expiredDate: '14/05/25'
        },
        {
            stockId: '02337',
            productName: 'Vertex Cooling Fan',
            route: '3E',
            batchNo: '45321',
            quantity: '3000',
            expiredDate: '20/06/30'
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
        { header: "BATCH NO", accessor: "batchNo", align: "center" },
        { header: "QUANTITY", accessor: "quantity", align: "center" },
        {
            header: "EXPIRY/ED",
            accessor: "expiredDate",
            align: "right",
            className: "text-red-500"
        },
    ];

    return (
        <MainTable
            title="Expiring soon products"
            columns={columns}
            rows={expiringProducts}

        />
    );
};

export default ExpiringStocksSection;