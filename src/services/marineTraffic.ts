import axios from 'axios';

const MARINE_TRAFFIC_API_KEY = import.meta.env.VITE_MARINE_TRAFFIC_API_KEY || 'YOUR_API_KEY';
const PORT_MMSI = import.meta.env.VITE_PORT_MMSI || '123456789'; // Port of Algiers MMSI

export interface VesselPosition {
  mmsi: string;
  name: string;
  lat: number;
  lon: number;
  speed: number;
  course: number;
  eta: string;
}

export const getExpectedArrivals = async (): Promise<VesselPosition[]> => {
  if (!MARINE_TRAFFIC_API_KEY || MARINE_TRAFFIC_API_KEY === 'YOUR_API_KEY') {
    console.warn('MarineTraffic API key not configured');
    return Promise.resolve([]);
  }

  try {
    const response = await axios.get<VesselPosition[]>(
      `https://services.marinetraffic.com/api/expectedarrivals/v2/${MARINE_TRAFFIC_API_KEY}`,
      {
        params: {
          portid: PORT_MMSI,
          protocol: 'jsono',
          days: 5,
          msgtype: 'simple'
        },
        timeout: 10000
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('MarineTraffic API error:', {
        status: error.response?.status,
        message: error.message
      });
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
}