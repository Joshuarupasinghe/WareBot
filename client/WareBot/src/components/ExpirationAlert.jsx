export default function ExpirationAlert() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 relative">
      {/* Expiration Alert Title - Centered and Moved Up */}
      <h1 className="text-white text-3xl font-semibold text-center mb-6">
        Expiration Alert!
      </h1>

      {/* Alert Box */}
      <div className="bg-white/40 backdrop-blur-lg p-8 shadow-lg w-[700px]">
        {/* Product Row with Buttons in Line */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-black text-lg font-medium w-32">Product:</span>
            <span className="bg-blue-100 px-12 py-1 rounded-md text-black font-semibold">Medicine</span>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-200/60 px-5 py-2 rounded-full text-black hover:bg-blue-500 text-sm font-medium">
              View Details
            </button>
            <button className="bg-blue-200/60 px-5 py-2 rounded-full text-black hover:bg-blue-500 text-sm font-medium">
              Dismiss
            </button>
          </div>
        </div>

        {/* Expiring In Row */}
        <div className="mb-4 flex items-center">
          <span className="text-black text-lg font-medium w-32">Expiring In:</span>
          <span className="bg-blue-100 px-14 py-1 rounded-md text-black font-semibold">
            <span className="text-red-500 font-bold">3</span> days
          </span>
        </div>
      </div>
    </div>
  );
}