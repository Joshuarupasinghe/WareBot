import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const RobotPerformance = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'This Week',
        data: [20, 22, 34, 45, 32, 30, 46],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: '#2196F3',
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'Last Week',
        data: [50, 16, 27, 23, 18, 11, 14],
        fill: true,
        backgroundColor: 'rgba(34, 211, 238, 0.3)',
        borderColor: '#26C6DA',
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + '%'; 
          },
          color: 'white',
          stepSize: 20,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl text-white font-semibold mb-6">Robot Performance</h2>
      <div className="bg-black/55 p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl text-white font-semibold">Task Completion Rate</h3>
            <h5 className="text-white text-md">
              <span className="text-green-500 font-semibold">(+5) more</span> than Last Week
            </h5>
          </div>
          <div className="text-white text-sm mt-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
              <span>This Week</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-400 rounded-full inline-block"></span>
              <span>Last Week</span>
            </div>
          </div>
        </div>
        <div className="h-72 mt-4">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  )
}

export default RobotPerformance
