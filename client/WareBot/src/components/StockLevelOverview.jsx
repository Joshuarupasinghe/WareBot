import React from 'react'
import { FaBox, FaRocket, FaShoppingCart, FaTools } from "react-icons/fa";
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const StockLevelOverview = () => {
  const data = {
    labels: [
      'Category',
      'Category',
      'Category',
      'Category',
      'Category',
      'Category',
      'Category',
      'Category',
      'Category'
    ],
    datasets: [
      {
        label: 'Stock Level',
        data: [
          330,
          220,
          100,
          300,
          500,
          400,
          450,
          300,
          150,
        ],
        backgroundColor: ['#FFFFFF'],
        borderWidth: 0,
        barThickness: 15,
      },
    ],
  }

  const stats = [
    {
      label: "Total Order Count",
      value: "32,984",
      icon: <FaBox />,
    },
    {
      label: "Orders Processed",
      value: "300",
      icon: <FaRocket />,
    },
    {
      label: "Low Stock Items",
      value: "15 Products",
      icon: <FaShoppingCart />,
    },
    {
      label: "Expiring Soon Items",
      value: "320",
      icon: <FaTools />,
    },
  ];

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#E0E0E0',
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#E0E0E0',
          stepSize: 100,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  }

  return (
    <div>
      <h2 className="text-2xl text-white font-semibold mb-6">
        Stock Level Overview
      </h2>
      <div className="bg-black/55 p-4 rounded-3xl shadow-xl">
        <div className='h-52 bg-black/30 p-6 rounded-3xl'>
          <Bar
            data={data}
            options={options}
            aria-label="Stock Level Overview Chart"
            role="img"
          />
        </div>
        <div className='p-3'>
          <div>
            <h3 className="text-xl text-white font-semibold">Stock Level Overview</h3>
            <h5 className="text-white text-md">
              <span className="text-green-500 font-semibold">(+23)</span> than Last Week
            </h5>
          </div>
          <div className="text-white rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-blue-400">
                  <div className="bg-blue-600 p-2 rounded-full text-white">
                    {stat.icon}
                  </div>
                  <span>{stat.label}</span>
                </div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="h-1 w-full bg-blue-800 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full w-[60%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockLevelOverview