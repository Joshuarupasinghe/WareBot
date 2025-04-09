import React, { useEffect, useState } from 'react';
import ConnectRobotToWifi from '../components/ConnectRobotToWifi'
import StatusCard from '../components/StatusCard'
import { FaRobot } from "react-icons/fa";

const SettingsAndConfiguration = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/device-status/robot001');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='p-8'>
      <div className='flex gap-10 pb-8'>
        <div className='w-96'>
          <ConnectRobotToWifi />
        </div>
      </div>
      <div className='w-96'>
        <StatusCard
        title="Robot Status"
        statusText={status.online ? 'Online' : 'Offline'}
        icon={<FaRobot/>}
        lastHeartbeat={new Date(status.lastHeartbeat).toLocaleTimeString()}
        ipAddress={status.ip} />
      </div>

    </div>
  )
}

export default SettingsAndConfiguration


