export type MapType = 'pakistan' | 'indonesia' | 'sano-oil' | 'alpine';
export type WeatherType = 'day' | 'night' | 'rain' | 'sunset';
export type CameraView = 'chase' | 'cabin' | 'drone' | 'bumper';

export interface BusLivery {
  id: string;
  name: string;
  subtitle: string;
  bodyColor: string;
  accentColor: string;
  roofColor: string;
  stripeColor: string;
  brandName: string;
  tagline: string;
  badge: string;
}

export interface MapConfig {
  id: MapType;
  name: string;
  urduName: string;
  description: string;
  skyColor: string;
  fogColor: string;
  groundColor: string;
  roadColor: string;
  weatherDefault: WeatherType;
  landmarkName: string;
}

export const LIVERIES: BusLivery[] = [
  {
    id: 'hmc-pak-dumper',
    name: 'HMC Pak Dumper (SAD LOVER)',
    subtitle: 'Pakistani Heavy Hydraulic Dumper MOD',
    bodyColor: '#dc2626', // Red
    accentColor: '#10b981', // Emerald green
    roofColor: '#111827', // Dark steel
    stripeColor: '#fbbf24', // Gold
    brandName: 'HMC PAK DUMPER',
    tagline: 'SAD LOVER • رانا برادرز ڈمپر',
    badge: '🇵🇰 New MOD Download'
  },
  {
    id: 'rana-brothers',
    name: 'Rana Brothers Shandar',
    subtitle: 'Pakistani Truck Art Special Edition',
    bodyColor: '#b91c1c', // Deep Red
    accentColor: '#f59e0b', // Gold / Amber
    roofColor: '#1e1b4b', // Deep indigo
    stripeColor: '#fbbf24',
    brandName: 'RANA BROTHERS',
    tagline: 'لاہور تا راولپنڈی - شانِ پاکستان',
    badge: '🇵🇰 Pakistan Special'
  },
  {
    id: 'flixbus',
    name: 'FlixBus Neo Express',
    subtitle: 'Official European Miniature Green Coach',
    bodyColor: '#65a30d', // FlixBus Green
    accentColor: '#ea580c', // Orange
    roofColor: '#4d7c0f',
    stripeColor: '#f97316',
    brandName: 'FLIXBUS',
    tagline: 'Ride Green, Travel Clean',
    badge: '🚌 Official FlixBus'
  },
  {
    id: 'sano-oil',
    name: 'Sano Oil Midnight Shuttle',
    subtitle: 'Cyberpunk Neon Petroleum Express',
    bodyColor: '#581c87', // Neon Purple
    accentColor: '#06b6d4', // Cyan
    roofColor: '#0f172a',
    stripeColor: '#a855f7',
    brandName: 'SANO OIL',
    tagline: '24/7 Midnight Petroleum Fleet',
    badge: '⛽ Sano Oil Saga'
  },
  {
    id: 'jetbus',
    name: 'Jetbus 3+ Voyager SHD',
    subtitle: 'Indonesian Super High Deck Tourist Bus',
    bodyColor: '#0284c7', // Sky Blue
    accentColor: '#ffffff', // White
    roofColor: '#0369a1',
    stripeColor: '#38bdf8',
    brandName: 'JETBUS 3+',
    tagline: 'Pariwisata Trans-Java Executive',
    badge: '🇮🇩 Original BUSSID'
  }
];

export const MAPS: MapConfig[] = [
  {
    id: 'pakistan',
    name: 'Pakistan GT Road (Lahore - Murree)',
    urduName: 'پاکستان جی ٹی روڈ (لاہور تا مری)',
    description: 'Bustling GT Road with roadside Dhabas, truck art barriers, Bab-e-Pakistan, and Murree mountain switchbacks.',
    skyColor: '#1e293b',
    fogColor: '#334155',
    groundColor: '#78350f',
    roadColor: '#1e293b',
    weatherDefault: 'day',
    landmarkName: 'Bab-e-Pakistan Dhaba'
  },
  {
    id: 'indonesia',
    name: 'Indonesia Trans-Java (Jakarta - Bandung)',
    urduName: 'انڈونیشیا کوسٹل ہائی وے',
    description: 'Tropical coastal highway with towering coconut palms, ocean bridges, and winding rainforest passes.',
    skyColor: '#0f766e',
    fogColor: '#134e4a',
    groundColor: '#14532d',
    roadColor: '#18181b',
    weatherDefault: 'sunset',
    landmarkName: 'Jembatan Suramadu'
  },
  {
    id: 'sano-oil',
    name: 'Sano Oil Midnight Expressway',
    urduName: 'سانو آئل مڈنائٹ پٹرول روڈ',
    description: 'Rain-soaked asphalt, neon purple fuel pumps, reflective puddles, and cozy midnight gas station stops.',
    skyColor: '#090914',
    fogColor: '#171126',
    groundColor: '#0f0f1d',
    roadColor: '#0a0a14',
    weatherDefault: 'rain',
    landmarkName: 'Sano Oil Pump #7'
  },
  {
    id: 'alpine',
    name: 'FlixBus Snowy Alpine Pass',
    urduName: 'فلکس بس الپائن برفانی گھاٹی',
    description: 'Snow covered pine trees, frosted mountain cliffs, winding switchbacks, and cozy cabin lights.',
    skyColor: '#334155',
    fogColor: '#64748b',
    groundColor: '#f1f5f9',
    roadColor: '#334155',
    weatherDefault: 'day',
    landmarkName: 'Alpine Peak Tunnel'
  }
];
