import React from "react";

// Auto color map for different statuses
const statusColorMap = {
  online: "bg-emerald-500",
  offline: "bg-red-500",
  idle: "bg-yellow-500",
  unknown: "bg-gray-500",
};

const StatusCard = ({
  title,
  statusText = "Unknown",
  icon,
  lastHeartbeat = "N/A",
  ipAddress = "N/A",
}) => {
  const statusKey = statusText.toLowerCase();
  const statusColor = statusColorMap[statusKey] || statusColorMap["unknown"];

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-black/40 shadow-md w-fit min-w-[360px] gap-4">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">{title}</span>
        <div className="flex items-center gap-2">
          {/* Animated Dot */}
          <span className={`h-2.5 w-2.5 rounded-full animate-ping absolute ${statusColor} opacity-75`} />
          <span className={`h-2.5 w-2.5 rounded-full relative ${statusColor}`} />
          <span className={`text-xs text-white font-medium px-3 py-1 rounded-full ${statusColor}`}>
            {statusText}
          </span>
        </div>
      </div>

      {/* Center: Heartbeat + IP */}
      <div className="flex flex-col items-start text-xs text-gray-400 leading-tight">
        <div>
          Last Heartbeat: <span className="text-white">{lastHeartbeat}</span>
        </div>
        <div>
          IP Address: <span className="text-white">{ipAddress}</span>
        </div>
      </div>

      {/* Right Icon */}
      <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl">
        {icon}
      </div>
    </div>
  );
};

export default StatusCard;
