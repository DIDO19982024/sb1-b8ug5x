import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Minus, Save, RefreshCw } from 'lucide-react';
import { resources, docks, storageAreas } from '../data/mockData';
import type { Resource, Dock, StorageArea } from '../types';

type ResourceForm = {
  type: Resource['type'];
  capacity: number;
  specializations: string[];
};

type StorageForm = {
  name: string;
  type: StorageArea['type'];
  capacity: number;
};

type DockForm = {
  name: string;
  depth: number;
  equipment: string[];
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'resources' | 'docks' | 'storage'>('resources');
  const { register: registerResource, handleSubmit: handleResourceSubmit } = useForm<ResourceForm>();
  const { register: registerStorage, handleSubmit: handleStorageSubmit } = useForm<StorageForm>();
  const { register: registerDock, handleSubmit: handleDockSubmit } = useForm<DockForm>();

  const onResourceSubmit = (data: ResourceForm) => {
    console.log('Nouvelle ressource:', data);
    // Implémenter l'ajout à la base de données
  };

  const onStorageSubmit = (data: StorageForm) => {
    console.log('Nouvelle zone de stockage:', data);
    // Implémenter l'ajout à la base de données
  };

  const onDockSubmit = (data: DockForm) => {
    console.log('Nouveau quai:', data);
    // Implémenter l'ajout à la base de données
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Panneau d'Administration</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'resources'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Ressources
        </button>
        <button
          onClick={() => setActiveTab('docks')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'docks'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Quais
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'storage'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Stockage
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'resources' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des Ressources</h3>
            <form onSubmit={handleResourceSubmit(onResourceSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  {...registerResource('type')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="crane">Grue</option>
                  <option value="forklift">Chariot élévateur</option>
                  <option value="team">Équipe</option>
                  <option value="tugboat">Remorqueur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacité</label>
                <input
                  type="number"
                  {...registerResource('capacity')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </button>
            </form>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ressources Actuelles</h4>
              <div className="space-y-2">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{resource.type}</p>
                      <p className="text-sm text-gray-500">Capacité: {resource.capacity}</p>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des Zones de Stockage</h3>
            <form onSubmit={handleStorageSubmit(onStorageSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  {...registerStorage('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  {...registerStorage('type')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="container">Conteneurs</option>
                  <option value="warehouse">Entrepôt</option>
                  <option value="parking">Parking</option>
                  <option value="openStorage">Stockage ouvert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacité</label>
                <input
                  type="number"
                  {...registerStorage('capacity')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </button>
            </form>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Zones de Stockage Actuelles</h4>
              <div className="space-y-2">
                {storageAreas.map((area) => (
                  <div
                    key={area.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{area.name}</p>
                      <p className="text-sm text-gray-500">
                        Capacité: {area.capacity.used}/{area.capacity.total}
                      </p>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docks' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des Quais</h3>
            <form onSubmit={handleDockSubmit(onDockSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  {...registerDock('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profondeur (m)</label>
                <input
                  type="number"
                  {...registerDock('depth')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </button>
            </form>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quais Actuels</h4>
              <div className="space-y-2">
                {docks.map((dock) => (
                  <div
                    key={dock.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{dock.name}</p>
                      <p className="text-sm text-gray-500">Profondeur: {dock.depth}m</p>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}