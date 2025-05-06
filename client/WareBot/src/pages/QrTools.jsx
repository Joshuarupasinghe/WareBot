import React, { useState } from 'react';
import QRGeneratorPage from '../components/QrGenerator';
import QRScannerPage from '../components/QrSanner';

const QrTools = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 p-8">
      <div className="max-w-5xl mx-auto bg-[#031C30] rounded-xl shadow-lg">
        {/* Tabs */}
        <div className="flex border-b border-gray-500">
          <button
            className={`flex-1 py-3 text-center font-semibold ${activeTab === 'scanner' ? 'bg-[#042a49] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('scanner')}
          >
            Scanner
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold ${activeTab === 'generator' ? 'bg-[#042a49] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('generator')}
          >
            Generator
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'scanner' && <QRScannerPage />}
          {activeTab === 'generator' && <QRGeneratorPage />}
        </div>
      </div>
    </div>
  );
};

export default QrTools;
