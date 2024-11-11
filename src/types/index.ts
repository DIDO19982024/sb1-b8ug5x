export interface Vessel {
  id: string;
  name: string;
  type: 'cargo' | 'container' | 'tanker' | 'roro';
  status: 'approaching' | 'docked' | 'departing' | 'maintenance';
  eta: string;
  position: {
    lat: number;
    lng: number;
  };
  cargo: {
    type: string;
    quantity: number;
    specialRequirements?: string[];
  };
  dimensions: {
    length: number;
    width: number;
    draft: number;
  };
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export interface Dock {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  currentVessel?: string;
  capacity: number;
  depth: number;
  equipment: string[];
  specialFeatures?: string[];
  maintenanceSchedule?: {
    lastMaintenance: string;
    nextMaintenance: string;
  };
}

export interface Resource {
  id: string;
  type: 'crane' | 'forklift' | 'team' | 'tugboat';
  status: 'available' | 'busy' | 'maintenance';
  assignedTo?: string;
  capacity: number;
  specializations?: string[];
  location?: string;
  maintenanceSchedule?: {
    lastMaintenance: string;
    nextMaintenance: string;
  };
}

export interface StorageArea {
  id: string;
  type: 'container' | 'warehouse' | 'parking' | 'openStorage';
  name: string;
  capacity: {
    total: number;
    used: number;
    reserved: number;
  };
  status: 'operational' | 'maintenance' | 'full';
  specialFeatures?: string[];
  contents?: StorageContent[];
  temperature?: {
    min: number;
    max: number;
    current: number;
  };
}

export interface StorageContent {
  id: string;
  type: string;
  quantity: number;
  arrival: string;
  departure?: string;
  owner: string;
  specialHandling?: string[];
}

export interface CargoStatus {
  id: string;
  vesselId: string;
  status: 'pending' | 'customs' | 'cleared' | 'loading' | 'unloading' | 'completed';
  progress: number;
  estimatedCompletion: string;
  assignedStorage?: string;
  customsDetails?: {
    status: 'pending' | 'inspection' | 'cleared' | 'held';
    documents: string[];
    inspector?: string;
  };
}

export interface PredictiveAnalysis {
  vesselId: string;
  recommendedDock: string;
  requiredResources: string[];
  estimatedTime: {
    docking: number;
    operation: number;
    total: number;
  };
  efficiency: number;
  risks?: string[];
  recommendedStorage?: string[];
}