import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import VesselList from './components/VesselList';
import DockStatus from './components/DockStatus';
import ResourceAllocation from './components/ResourceAllocation';
import Analytics from './components/Analytics';
import StorageStatus from './components/StorageStatus';
import AdminPanel from './components/AdminPanel';
import ExpectedArrivals from './components/ExpectedArrivals';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navires Actifs</h2>
              <VesselList />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">État des Quais</h2>
              <DockStatus />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Allocation des Ressources</h2>
              <ResourceAllocation />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Analyses de Performance</h2>
              <Analytics />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Zones de Stockage</h2>
              <StorageStatus />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Arrivées Prévues</h2>
              <ExpectedArrivals />
            </div>
          </div>

          <AdminPanel />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;