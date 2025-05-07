import React from 'react';
import MainTable from './MainTable';

const PendingStockTable = () => {
  const pendingStock = [
    { qp: "01", stockId: "02334", productName: "Alpha Smart Sensor", route: "Route 12A", batchNo: "23434", quantity: "23434", location: "00W", task: "Fetching", time: "45 Min" },
    { qp: "02", stockId: "02334", productName: "Omega Lithium Battery", route: "5C", batchNo: "23434", quantity: "23434", location: "5C", task: "Delivering", time: "40 Min" },
    { qp: "03", stockId: "02334", productName: "Xenon LED Panel", route: "14D", batchNo: "23434", quantity: "23434", location: "14D", task: "Delivering", time: "38 Min" },
    { qp: "04", stockId: "02334", productName: "Vertex Cooling Fan", route: "3E", batchNo: "23434", quantity: "23434", location: "00W", task: "Fetching", time: "30 Min" },
    { qp: "05", stockId: "02334", productName: "Delta Hydraulic Pump", route: "7F", batchNo: "23434", quantity: "23434", location: "00W", task: "Fetching", time: "6 Min" }
  ];

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
      )
    },
    { header: 'BATCH NO', accessor: 'batchNo', align: 'center' },
    { header: 'QUANTITY', accessor: 'quantity', align: 'center' },
    { header: 'Origin Location', accessor: 'location', align: 'center' },
    { header: 'Requested Task', accessor: 'task', align: 'center' },
    { header: 'Requested Time', accessor: 'time', align: 'center' }
  ];

  return (
    <MainTable
      title="Pending Stock Queue"
      columns={columns}
      rows={pendingStock}
    />
  );
};

export default PendingStockTable;
