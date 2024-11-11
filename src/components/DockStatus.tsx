import React from 'react';
import { docks, vessels } from '../data/mockData';
import type { Dock } from '../types';

const getStatusStyle = (status: Dock['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'occupied':
      return 'bg-blue-100 text-blue-800';
    case 'maintenance':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function DockStatus() {
  return (
    <div className="space-y-3">
      {docks.map((dock) => {
        const vessel = dock.currentVessel 
          ? vessels.find(v => v.id === dock.currentVessel)
          : null;

        return (
          <div key={dock.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{dock.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(dock.status)}`}>
                {dock.status}
              </span>
            </div>
            {vessel && (
              <div className="mt-2 text-sm text-gray-500">
                <p>Navire: {vessel.name}</p>
                <p>Capacité: {dock.capacity} TEU</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}