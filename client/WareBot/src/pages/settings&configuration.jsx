import React, { useEffect, useState } from 'react';
import ConnectRobotToWifi from '../components/ConnectRobotToWifi';
import StatusCard from '../components/StatusCard';
import { FaRobot } from 'react-icons/fa';

const SettingsAndConfiguration = () => {
  const [status, setStatus] = useState({ online: null, ip: null, lastHeartbeat: null });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/device-status/robot001');
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error('Failed to fetch status:', err);
        setStatus({ online: null, ip: null, lastHeartbeat: null });
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
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
          statusText={
            status.online === true
              ? 'Online'
              : status.online === false
              ? 'Offline'
              : 'N/A'
          }
          icon={<FaRobot />}
          lastHeartbeat={
            status.lastHeartbeat
              ? new Date(status.lastHeartbeat).toLocaleTimeString()
              : 'N/A'
          }
          ipAddress={status.ip || 'N/A'}
        />
      </div>
    </div>
  );
};

export default SettingsAndConfiguration;
