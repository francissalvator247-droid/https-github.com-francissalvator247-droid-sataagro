export type ThemeMode = 'light' | 'dark';
export type TextSizeMode = 'standard' | 'accessible-large';

export interface Commodity {
  id: string;
  name: string;
  scientificName: string;
  category: 'Rice & Paddy' | 'Feed & Coarse Grains' | 'Oilseeds & Legumes';
  variety: string;
  moistureContent: string;
  purityRate: string;
  packagingTypes: string[];
  minimumOrder: string;
  minTonnage: number;
  description: string;
  industrialUses: string[];
  keySpec: string;
  image?: string;
  pricePerTonNgn: number;
  pricePerTonUsd: number;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  metrics: string;
}

export interface StrategicGoal {
  id: string;
  milestone: string;
  title: string;
  targetMetric: string;
  description: string;
}

export interface CoreValue {
  title: string;
  shortSummary: string;
  description: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  division: string;
  bio: string;
  expertise: string[];
  image?: string;
}

export interface RfqFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  commodityId: string;
  volumeMetricTons: number;
  packaging: string;
  destinationState: string;
  deliveryType: 'Local Delivery' | 'Ex-Warehouse (Abuja)' | 'Export (Port of Departure)';
  targetTimeline: string;
  notes: string;
}
