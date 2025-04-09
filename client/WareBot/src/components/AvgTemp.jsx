import React from 'react';
import GaugeChart from 'react-gauge-component';

const AvgTemp = () => {
  const temperature = 95;

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
            value={temperature}
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
            <p className="text-3xl font-bold">{temperature}°C</p>
            <p className="text-sm text-gray-400">Celsius</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvgTemp;