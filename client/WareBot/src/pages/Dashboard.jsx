import React, { useEffect, useState } from 'react';
import RobotCurrentTask from '../components/RobotCurrentTask'
import RobotPerformance from '../components/RobotPerformance'
import StockLevelOverview from '../components/StockLevelOverview'
import RecentAlerts from '../components/RecentAlerts'
import AvgTemp from '../components/AvgTemp'
import ShelfSpace from '../components/ShelfSpace'
import StatusCard from '../components/StatusCard'
import { FaRobot } from 'react-icons/fa';

const Dashboard = () => {
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
      <div className='flex gap-1 pb-8'>
        <div className='w-96'>
          <RobotCurrentTask />
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
      <div className='grid grid-cols-12 grid-rows-1 gap-8 pb-8'>
        <div className='col-span-6'>
          <RobotPerformance />
        </div>
        <div className='col-span-6 col-start-7'>
          <StockLevelOverview />
        </div>
      </div>
      <div className="grid grid-cols-7 grid-rows-1 gap-8">
        <div className="col-span-2">
          <ShelfSpace />
        </div>
        <div className="col-span-2 col-start-3">
          <AvgTemp />
        </div>
        <div className="col-span-3 col-start-5">
          <RecentAlerts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard