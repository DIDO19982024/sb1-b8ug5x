import { Vessel, Dock, Resource, CargoStatus, StorageArea } from '../types';

export const vessels: Vessel[] = [
  {
    id: 'v1',
    name: 'Maersk Sealand',
    type: 'container',
    status: 'approaching',
    eta: '2024-03-20T14:30:00',
    position: { lat: 43.2951, lng: -5.1234 },
    cargo: {
      type: 'containers',
      quantity: 1500,
      specialRequirements: ['refrigerated', 'hazardous']
    },
    dimensions: {
      length: 366,
      width: 48,
      draft: 15.5
    },
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: 'v2',
    name: 'Pacific Runner',
    type: 'cargo',
    status: 'docked',
    eta: '2024-03-19T10:00:00',
    position: { lat: 43.2951, lng: -5.1234 },
    cargo: {
      type: 'bulk',
      quantity: 25000,
      specialRequirements: ['covered']
    },
    dimensions: {
      length: 225,
      width: 32,
      draft: 12
    }
  },
  {
    id: 'v3',
    name: 'Nordic Crown',
    type: 'tanker',
    status: 'approaching',
    eta: '2024-03-21T08:15:00',
    position: { lat: 43.3001, lng: -5.1300 },
    cargo: {
      type: 'oil',
      quantity: 50000,
      specialRequirements: ['temperature-controlled']
    },
    dimensions: {
      length: 274,
      width: 48,
      draft: 16.5
    }
  },
  {
    id: 'v4',
    name: 'Atlantic Carrier',
    type: 'roro',
    status: 'maintenance',
    eta: '2024-03-22T16:45:00',
    position: { lat: 43.2980, lng: -5.1250 },
    cargo: {
      type: 'vehicles',
      quantity: 800,
      specialRequirements: ['secured']
    },
    dimensions: {
      length: 200,
      width: 32,
      draft: 8.5
    }
  }
];

export const docks: Dock[] = [
  {
    id: 'd1',
    name: 'North Dock 1',
    status: 'occupied',
    currentVessel: 'v2',
    capacity: 2000,
    depth: 16,
    equipment: ['heavy-crane', 'conveyor'],
    specialFeatures: ['covered-storage']
  },
  {
    id: 'd2',
    name: 'South Dock 1',
    status: 'available',
    capacity: 1500,
    depth: 18,
    equipment: ['container-crane', 'refrigeration'],
    specialFeatures: ['hazmat-certified']
  },
  {
    id: 'd3',
    name: 'East Terminal',
    status: 'available',
    capacity: 3000,
    depth: 20,
    equipment: ['tanker-arms', 'pipeline'],
    specialFeatures: ['temperature-control']
  },
  {
    id: 'd4',
    name: 'West RoRo Terminal',
    status: 'maintenance',
    capacity: 1000,
    depth: 12,
    equipment: ['ramp', 'tug'],
    specialFeatures: ['vehicle-handling'],
    maintenanceSchedule: {
      lastMaintenance: '2024-03-15',
      nextMaintenance: '2024-03-22'
    }
  }
];

export const resources: Resource[] = [
  {
    id: 'r1',
    type: 'crane',
    status: 'busy',
    assignedTo: 'v2',
    capacity: 50,
    specializations: ['container', 'heavy-lift']
  },
  {
    id: 'r2',
    type: 'team',
    status: 'available',
    capacity: 10,
    specializations: ['hazmat', 'general-cargo']
  },
  {
    id: 'r3',
    type: 'forklift',
    status: 'available',
    capacity: 5,
    specializations: ['container', 'palletized']
  },
  {
    id: 'r4',
    type: 'tugboat',
    status: 'available',
    capacity: 100,
    specializations: ['vessel-assist', 'emergency']
  }
];

export const storageAreas: StorageArea[] = [
  {
    id: 's1',
    type: 'container',
    name: 'Container Terminal A',
    capacity: {
      total: 5000,
      used: 3750,
      reserved: 500
    },
    status: 'operational',
    specialFeatures: ['reefer-points', 'hazmat-certified'],
    contents: [
      {
        id: 'c1',
        type: 'standard',
        quantity: 2500,
        arrival: '2024-03-15',
        owner: 'Maersk',
        specialHandling: []
      },
      {
        id: 'c2',
        type: 'refrigerated',
        quantity: 1250,
        arrival: '2024-03-18',
        owner: 'MSC',
        specialHandling: ['temperature-controlled']
      }
    ]
  },
  {
    id: 's2',
    type: 'warehouse',
    name: 'General Cargo Warehouse',
    capacity: {
      total: 10000,
      used: 6000,
      reserved: 1000
    },
    status: 'operational',
    specialFeatures: ['climate-controlled', 'security-monitored'],
    temperature: {
      min: 15,
      max: 25,
      current: 20
    }
  },
  {
    id: 's3',
    type: 'parking',
    name: 'Vehicle Terminal',
    capacity: {
      total: 1000,
      used: 450,
      reserved: 200
    },
    status: 'operational',
    specialFeatures: ['covered-areas', 'charging-stations']
  },
  {
    id: 's4',
    type: 'openStorage',
    name: 'Bulk Storage Area',
    capacity: {
      total: 50000,
      used: 30000,
      reserved: 5000
    },
    status: 'operational',
    specialFeatures: ['drainage-system', 'dust-suppression']
  }
];

export const predictVesselOperation = (vesselId: string) => {
  const vessel = vessels.find(v => v.id === vesselId);
  if (!vessel) return null;

  const compatibleDocks = docks.filter(d => 
    d.depth >= vessel.dimensions.draft &&
    d.status === 'available'
  );

  if (compatibleDocks.length === 0) return null;

  const scoredDocks = compatibleDocks.map(dock => {
    let score = 0;
    if (vessel.type === 'container' && dock.equipment.includes('container-crane')) score += 3;
    if (vessel.type === 'tanker' && dock.equipment.includes('tanker-arms')) score += 3;
    if (vessel.type === 'roro' && dock.equipment.includes('ramp')) score += 3;
    vessel.cargo.specialRequirements?.forEach(req => {
      if (dock.specialFeatures?.includes(req)) score += 2;
    });
    return { dock, score };
  });

  const bestDock = scoredDocks.reduce((a, b) => a.score > b.score ? a : b).dock;

  const recommendedStorage = findSuitableStorage(vessel);
  const baseTime = vessel.cargo.quantity / 100;
  const dockingTime = vessel.dimensions.length > 300 ? 2 : 1;

  return {
    vesselId: vessel.id,
    recommendedDock: bestDock.id,
    requiredResources: calculateRequiredResources(vessel),
    estimatedTime: {
      docking: dockingTime,
      operation: baseTime,
      total: dockingTime + baseTime
    },
    efficiency: 0.85,
    risks: calculateRisks(vessel, bestDock),
    recommendedStorage
  };
};

const calculateRequiredResources = (vessel: Vessel) => {
  const required: string[] = [];
  if (vessel.type === 'container') {
    required.push('container-crane');
    required.push('forklift');
  }
  if (vessel.type === 'roro') {
    required.push('tugboat');
    required.push('vehicle-handlers');
  }
  if (vessel.cargo.specialRequirements?.includes('hazardous')) {
    required.push('hazmat-team');
  }
  return required;
};

const calculateRisks = (vessel: Vessel, dock: Dock) => {
  const risks: string[] = [];
  if (vessel.dimensions.draft >= dock.depth - 2) {
    risks.push('Limited depth clearance');
  }
  if (vessel.cargo.specialRequirements?.some(req => !dock.specialFeatures?.includes(req))) {
    risks.push('Missing specialized equipment');
  }
  return risks;
};

const findSuitableStorage = (vessel: Vessel): string[] => {
  const suitable: string[] = [];
  
  storageAreas.forEach(area => {
    const availableCapacity = area.capacity.total - area.capacity.used - area.capacity.reserved;
    
    if (vessel.type === 'container' && area.type === 'container' && 
        availableCapacity >= vessel.cargo.quantity) {
      suitable.push(area.id);
    }
    
    if (vessel.type === 'roro' && area.type === 'parking' && 
        availableCapacity >= vessel.cargo.quantity) {
      suitable.push(area.id);
    }
    
    if ((vessel.type === 'cargo' || vessel.type === 'tanker') && 
        area.type === 'warehouse' && 
        availableCapacity >= vessel.cargo.quantity) {
      suitable.push(area.id);
    }
  });
  
  return suitable;
};