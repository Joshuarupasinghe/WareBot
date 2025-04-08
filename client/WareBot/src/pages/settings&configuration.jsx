import React from 'react'
import ConnectRobotToWifi from '../components/ConnectRobotToWifi'

const SettingsAndConfiguration = () => {
    return (
      <div className='p-8'>
        <div className='flex gap-10 pb-8'>
          <div className='w-96'>
            <ConnectRobotToWifi />
          </div>
        </div>
       
      </div>
    )
  }
  
  export default SettingsAndConfiguration


