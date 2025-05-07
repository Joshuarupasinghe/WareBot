import React from 'react'

const RecentAlerts = () => {

  const alerts = [
    {
      title: "$2400, Design changes",
      date: "22 DEC 7:20 PM",
    },
    {
      title: "New order #4219423",
      date: "21 DEC 11:21 PM",
    },
    {
      title: "Server Payments for April",
      date: "21 DEC 9:28 PM",
    },
    {
      title: "New card added for order #3210145",
      date: "20 DEC 3:52 PM",
    },
    {
      title: "Unlock packages for Development",
      date: "19 DEC 11:35 PM",
    },
    {
      title: "New order #9851258",
      date: "18 DEC 4:41 PM",
    },
  ];

  return (
    <div>
      <div className="bg-black/60 text-white p-6 rounded-3xl max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-6">Recent Alerts</h2>
        <div className="space-y-5">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-3 border-b border-gray-700 ml-6">
              <div>
                <div className="text-sm font-medium">{alert.title}</div>
                <div className="text-xs text-gray-400">{alert.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentAlerts