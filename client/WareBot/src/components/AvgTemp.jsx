import React from 'react'
import { MdOutlineEmojiEmotions } from "react-icons/md";

const AvgTemp = () => {

  const temperature = 95;
  const percentage = (temperature / 100) * 100;

  return (
    <div>
      <div className="max-w-sm rounded-3xl bg-black/50 p-6 text-white shadow-xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Average Temperature</h2>
          <p className="text-sm text-gray-400">Scanned Temperature</p>
        </div>

        <div>
          
        </div>

        <div className='bg-black/40 p-3 rounded-3xl'>
          <div className="flex justify-between text-sm text-gray-400 px-4">
            <span>0°C</span>
            <span>100°C</span>
          </div>

          <div className="mt-2 text-center">
            <p className="text-3xl font-bold">{temperature}°C</p>
            <p className="text-sm text-gray-400">Celsius</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvgTemp