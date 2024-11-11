import React from 'react';
import { Box, Warehouse, Car, Layers } from 'lucide-react';
import { storageAreas } from '../data/mockData';
import type { StorageArea } from '../types';

const getStorageIcon = (type: StorageArea['type']) => {
  switch (type) {
    case 'container': return Layers;
    case 'warehouse': return Warehouse;
    case 'parking': return Car;
    case 'openStorage': return Box;
    default: return Box;
  }
};

export default function StorageStatus() {
  return (
    <div className="space-y-4">
      {storageAreas.map((area) => {
        const StorageIcon = getStorageIcon(area.type);
        const occupancyRate = (area.capacity.used / area.capacity.total) * 100;
        const reservedRate = (area.capacity.reserved / area.capacity.total) * 100;
        const availableRate = 100 - occupancyRate - reservedRate;

        return (
          <div key={area.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <StorageIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-900">{area.name}</h3>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                area.status === 'operational' ? 'bg-green-100 text-green-800' :
                area.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {area.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Capacité totale: {area.capacity.total}</span>
                <span>Utilisé: {area.capacity.used}</span>
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-blue-600 transition-all duration-300"
                    style={{ width: `${occupancyRate}%` }}
                  />
                  <div 
                    className="bg-yellow-400 transition-all duration-300"
                    style={{ width: `${reservedRate}%` }}
                  />
                  <div 
                    className="bg-green-400 transition-all duration-300"
                    style={{ width: `${availableRate}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-1" />
                  Occupé ({Math.round(occupancyRate)}%)
                </span>
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1" />
                  Réservé ({Math.round(reservedRate)}%)
                </span>
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-1" />
                  Disponible ({Math.round(availableRate)}%)
                </span>
              </div>

              {area.temperature && (
                <div className="mt-3 text-sm text-gray-600">
                  <p>Température: {area.temperature.current}°C</p>
                  <p className="text-xs text-gray-500">
                    (Min: {area.temperature.min}°C, Max: {area.temperature.max}°C)
                  </p>
                </div>
              )}

              {area.contents && area.contents.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Contenu</h4>
                  <div className="space-y-2">
                    {area.contents.map((content) => (
                      <div key={content.id} className="text-sm text-gray-600">
                        <p>{content.quantity} {content.type} - {content.owner}</p>
                        <p className="text-xs text-gray-500">
                          Arrivée: {new Date(content.arrival).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}