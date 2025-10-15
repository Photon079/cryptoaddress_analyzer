// Shared types and interfaces used across the application

export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AddressEntry {
  id: string;
  userId: string;
  address: string;
  label?: string;
  tags?: string[];
  riskScore: number;
  blockchain: 'ethereum' | 'bitcoin' | 'other';
  isFavorite: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RiskAssessment {
  address: string;
  blockchain: 'ethereum' | 'bitcoin';
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  lastUpdated: string;
}

export interface EthereumAddressData {
  address: string;
  balance: string;
  transactionCount: number;
  firstSeen: string;
  lastSeen: string;
  contractCreation?: string;
  isContract: boolean;
}

export interface BitcoinAddressData {
  address: string;
  balance: number;
  totalReceived: number;
  totalSent: number;
  transactionCount: number;
  firstSeen: string;
  lastSeen: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Appwrite configuration interface
export interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  databaseId: string;
  userProfilesCollectionId: string;
  addressBookCollectionId: string;
  alertsCollectionId?: string;
  avatarsBucketId: string;
}

// Blockchain types
export type BlockchainType = 'ethereum' | 'bitcoin' | 'other';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
