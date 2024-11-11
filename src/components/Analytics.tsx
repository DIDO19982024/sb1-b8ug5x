import React from 'react';

function Analytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Average Waiting Time</h3>
        <p className="text-3xl font-bold text-blue-600">2.5 hrs</p>
        <p className="text-sm text-gray-500 mt-1">↓ 15% from last week</p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Cargo Throughput</h3>
        <p className="text-3xl font-bold text-blue-600">1,250 TEU</p>
        <p className="text-sm text-gray-500 mt-1">↑ 8% from last week</p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Resource Utilization</h3>
        <p className="text-3xl font-bold text-blue-600">85%</p>
        <p className="text-sm text-gray-500 mt-1">↑ 5% from last week</p>
      </div>
    </div>
  );
}

export default Analytics;