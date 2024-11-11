import React from 'react';
import { Activity, Anchor, Clock, Box } from 'lucide-react';
import { vessels, docks, resources } from '../data/mockData';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Active Vessels',
      value: vessels.length,
      icon: Anchor,
      color: 'text-blue-600'
    },
    {
      title: 'Available Docks',
      value: docks.filter(d => d.status === 'available').length,
      icon: Box,
      color: 'text-green-600'
    },
    {
      title: 'Active Operations',
      value: vessels.filter(v => v.status === 'docked').length,
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Arrivals',
      value: vessels.filter(v => v.status === 'approaching').length,
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 mr-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}