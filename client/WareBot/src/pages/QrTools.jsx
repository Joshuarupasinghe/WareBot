import React, { useState } from 'react';
import QRGeneratorPage from '../components/QrGenerator';
import QRScannerPage from '../components/QrSanner';
import { MdQrCode, MdOutlineScanner } from 'react-icons/md';

const tabConfig = [
  { id: 'scanner', label: 'Scanner', icon: MdOutlineScanner },
  { id: 'generator', label: 'Generator', icon: MdQrCode }
];

const QrTools = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-[#031C30] rounded-2xl shadow-xl overflow-hidden">

        {/* Tab Buttons */}
        <div className="flex bg-[#021020] p-2 rounded-t-2xl">
          {tabConfig.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors duration-200 
                ${activeTab === id ? 'bg-gradient-to-r from-[#5653FE] to-[#8B5CF6] text-white' : 'text-gray-400 hover:bg-[#042a49]'}`}
            >
              <Icon className="text-xl" />
              <span className="hidden sm:inline-block font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {activeTab === 'scanner' && <QRScannerPage />}
          {activeTab === 'generator' && <QRGeneratorPage />}
        </div>
      </div>
    </div>
  );
};

export default QrTools;
