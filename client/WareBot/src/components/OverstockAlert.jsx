export default function OverstockAlert() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center -mt-10 relative">
        {/* Title */}
        <h1 className="text-white text-3xl font-bold tracking-wide text-center mb-6 drop-shadow">
          Overstock Alert!
        </h1>
  
        {/* Alert Box */}
        <div className="bg-gray-100/80 backdrop-blur-lg p-6 shadow-xl w-[480px] rounded-2xl">
          {/* Attention Message */}
          <div className="mb-6 text-center">
            <h2 className="text-gray-900 text-xl font-semibold mb-2">⚠️ Attention Required</h2>
            <p className="text-gray-800 text-base leading-relaxed">
              Shelf <span className="font-bold text-gray-900">[S3] </span> 
              has <span className="text-red-600 font-semibold"> exceeded </span> 
              its storage capacity,
              <br />
              Requiring immediate attention to prevent overloading.
            </p>
          </div>
  
          {/* Action Buttons */}
          <div className="flex justify-center gap-10">
            <button className="text-blue-700 text-base font-semibold hover:underline hover:text-blue-900 transition">
              Yes
            </button>
            <button className="text-blue-700 text-base font-semibold hover:underline hover:text-blue-900 transition">
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
  