import React, { useState } from 'react';
import { Ship, Anchor, Package, AlertCircle } from 'lucide-react';
import { vessels } from '../data/mockData';
import { predictVesselOperation } from '../data/mockData';
import type { Vessel, PredictiveAnalysis } from '../types';

const getStatusIcon = (status: Vessel['status']) => {
  switch (status) {
    case 'docked': return Anchor;
    case 'approaching': return Ship;
    case 'departing': return Package;
    default: return Ship;
  }
};

const getStatusStyle = (status: Vessel['status']) => {
  switch (status) {
    case 'docked': return 'bg-green-100 text-green-800';
    case 'approaching': return 'bg-blue-100 text-blue-800';
    case 'departing': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function VesselList() {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PredictiveAnalysis | null>(null);

  const handleVesselClick = (vesselId: string) => {
    setSelectedVessel(vesselId);
    const prediction = predictVesselOperation(vesselId);
    setAnalysis(prediction || null);
  };

  return (
    <div className="space-y-3">
      {vessels.map((vessel) => {
        const StatusIcon = getStatusIcon(vessel.status);
        const statusStyle = getStatusStyle(vessel.status);
        const eta = new Date(vessel.eta).toLocaleString('fr-FR', {
          dateStyle: 'short',
          timeStyle: 'short'
        });
        const isSelected = selectedVessel === vessel.id;

        return (
          <div key={vessel.id}>
            <div 
              className={`flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer transition-colors
                ${isSelected ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
              onClick={() => handleVesselClick(vessel.id)}
            >
              <StatusIcon className="h-5 w-5 text-blue-600 mr-3" />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{vessel.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusStyle}`}>
                    {vessel.status}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <p>Type: {vessel.type}</p>
                  <p>Cargo: {vessel.cargo.quantity} {vessel.cargo.type}</p>
                  <p>ETA: {eta}</p>
                </div>
              </div>
            </div>

            {isSelected && analysis && (
              <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Analyse Prédictive</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Quai recommandé:</span> {analysis.recommendedDock}</p>
                  <p><span className="font-medium">Temps estimé:</span> {analysis.estimatedTime.total}h</p>
                  <p><span className="font-medium">Ressources nécessaires:</span></p>
                  <ul className="list-disc list-inside pl-2">
                    {analysis.requiredResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                  {analysis.risks && analysis.risks.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium flex items-center text-amber-700">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Risques potentiels:
                      </p>
                      <ul className="list-disc list-inside pl-2 text-amber-700">
                        {analysis.risks.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}