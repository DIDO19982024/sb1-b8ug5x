import React from 'react';
import { resources } from '../data/mockData';
import type { Resource } from '../types';

const getStatusStyle = (status: Resource['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'busy':
      return 'bg-yellow-100 text-yellow-800';
    case 'maintenance':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ResourceAllocation() {
  const resourcesByType = resources.reduce((acc, resource) => {
    const type = resource.type;
    if (!acc[type]) {
      acc[type] = { total: 0, available: 0 };
    }
    acc[type].total += 1;
    if (resource.status === 'available') {
      acc[type].available += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; available: number }>);

  return (
    <div className="space-y-4">
      {Object.entries(resourcesByType).map(([type, stats]) => (
        <div key={type} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-gray-900 capitalize">{type}s</h3>
            <span className="text-sm text-gray-500">
              {stats.available}/{stats.total} disponibles
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stats.available / stats.total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}