import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const ShelfSpace = () => {
  return (
    <div>
      <div className="max-w-sm rounded-3xl bg-black/50 p-6 text-white shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Shelf Space</h2>
        </div>

        <div className="2xl:m-10">
          <Pie
            data={{
              labels: ['Occupied Space', 'Remaining Space'],
              datasets: [
                {
                  label: 'Percentage(%)',
                  data: [80, 20],
                  backgroundColor: [
                    '#26C6DA',
                    '#7B1FA2',
                  ],
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            style={{ height: '250px', width: '500px' }}
          />
        </div>

        <div className="p-3 rounded-3xl">
          <div className="flex justify-between text-lg text-white">
            <div>Space</div>
          </div>

          <div className="mt-2 text-center text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-purple-700"></span>
              <span>Remaining Space</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-cyan-400"></span>
              <span>Occupied Space</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShelfSpace