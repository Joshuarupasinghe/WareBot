import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-component';

const AvgTemp = ({ deviceId }) => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/robot001/average-temperature`);
        const data = await response.json();
        if (response.ok) {
          setTemperature(data.averageTemperature);
        } else {
          console.error('Failed to fetch temperature:', data.message);
        }
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    fetchTemperature();

    // Update every 5 minutes
    const interval = setInterval(fetchTemperature, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [deviceId]);

  return (
    <div>
      <div className="max-w-sm rounded-3xl bg-black/50 p-6 text-white shadow-xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Average Temperature</h2>
          <p className="text-sm text-gray-400">Scanned Temperature</p>
        </div>

        <div className="flex justify-center items-center">
          <GaugeChart
            type='semicircle'
            value={temperature || 0}
            arc={{
              width: 0.2,
              padding: 0,
              cornerRadius: 0,
              subArcs: [
                {
                  limit: 20,
                  color: '#74b324',
                  showTick: true,
                  tooltip: {
                    text: 'Too low temperature!',
                  },
                },
                {
                  limit: 40,
                  color: '#b9ce05',
                  showTick: true,
                  tooltip: {
                    text: 'Low temperature!',
                  },
                },
                {
                  limit: 60,
                  color: '#edaf00',
                  showTick: true,
                  tooltip: {
                    text: 'OK temperature!',
                  },
                },
                {
                  limit: 80,
                  color: '#ec6c01',
                  showTick: true,
                  tooltip: {
                    text: 'High temperature!',
                  },
                },
                {
                  color: '#e2221f',
                  tooltip: {
                    text: 'Too high temperature!',
                  },
                },
              ],
            }}
            pointer={{
              color: '#FFFFFF',
              length: 0.8,
              width: 15,
            }}
            labels={{
              valueLabel: { hide: true },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: {
                  formatTextValue: (value) => value + 'ºC',
                  style: { fontSize: 12 },
                },
              },
            }}
          />
        </div>

        <div className="bg-black/40 p-3 rounded-3xl">
          <div className="mt-2 text-center">
            <p className="text-3xl font-bold">{temperature !== null ? `${temperature}°C` : 'Loading...'}</p>
            <p className="text-sm text-gray-400">Celsius</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvgTemp;