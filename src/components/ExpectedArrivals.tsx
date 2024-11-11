import React from 'react';
import { useQuery } from 'react-query';
import { Ship, AlertCircle, RefreshCw } from 'lucide-react';
import { getExpectedArrivals } from '../services/marineTraffic';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ExpectedArrivals() {
  const { data: vessels, isLoading, isError, refetch } = useQuery(
    'expectedArrivals',
    getExpectedArrivals,
    {
      refetchInterval: 300000, // Refresh every 5 minutes
      retry: 3,
      onError: (error) => {
        console.error('Error fetching vessel data:', error);
      }
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-48 text-red-600">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>Error loading vessel data</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Expected Arrivals</h2>
        <button
          onClick={() => refetch()}
          className="p-2 hover:bg-gray-100 rounded-full"
          title="Refresh"
        >
          <RefreshCw className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-3">
        {vessels?.map((vessel) => (
          <div key={vessel.mmsi} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Ship className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">{vessel.name}</h3>
                <p className="text-sm text-gray-500">
                  ETA: {format(new Date(vessel.eta), 'PPpp', { locale: fr })}
                </p>
                <p className="text-sm text-gray-500">
                  Position: {vessel.lat.toFixed(4)}°N, {vessel.lon.toFixed(4)}°E
                </p>
                <p className="text-sm text-gray-500">
                  Speed: {vessel.speed} knots
                </p>
              </div>
            </div>
          </div>
        ))}

        {vessels?.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No expected arrivals at this time
          </div>
        )}
      </div>
    </div>
  );
}