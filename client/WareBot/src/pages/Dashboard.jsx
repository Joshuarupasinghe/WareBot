import React from 'react'
import RobotCurrentTask from '../components/RobotCurrentTask'
import RobotStatusLive from '../components/RobotStatusLive'
import RobotPerformance from '../components/RobotPerformance'
import StockLevelOverview from '../components/StockLevelOverview'
import RecentAlerts from '../components/RecentAlerts'
import AvgTemp from '../components/AvgTemp'
import ShelfSpace from '../components/ShelfSpace'

const Dashboard = () => {
  return (
    <div className='p-8'>
      <div className='flex gap-10 pb-8'>
        <div className='w-96'>
          <RobotCurrentTask />
        </div>
        <div className='w-96'>
          <RobotStatusLive />
        </div>
      </div>
      <div className='grid grid-cols-7 grid-rows-1 gap-8 pb-8'>
        <div className='col-span-4'>
          <RobotPerformance />
        </div>
        <div className='col-span-3 col-start-5'>
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