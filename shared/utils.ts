// Shared utility functions and constants
import type { RiskLevel, BlockchainType } from './types';

// Risk scoring constants and utilities
export const RISK_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
  CRITICAL: 100,
} as const;

export const BLOCKCHAIN_CONFIG = {
  ETHEREUM: {
    name: 'ethereum',
    symbol: 'ETH',
    format: /^0x[a-fA-F0-9]{40}$/,
    decimals: 18,
  },
  BITCOIN: {
    name: 'bitcoin',
    symbol: 'BTC',
    format: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
    decimals: 8,
  },
} as const;

// Utility functions
export const getRiskLevel = (score: number): RiskLevel => {
  if (score >= RISK_THRESHOLDS.CRITICAL) return 'critical';
  if (score >= RISK_THRESHOLDS.HIGH) return 'high';
  if (score >= RISK_THRESHOLDS.MEDIUM) return 'medium';
  return 'low';
};

export const getRiskColor = (level: RiskLevel): string => {
  switch (level) {
    case 'critical': return '#f56565';
    case 'high': return '#ed8936';
    case 'medium': return '#ed8936';
    case 'low': return '#48bb78';
    default: return '#9aa5ce';
  }
};

export const getRiskIcon = (level: RiskLevel): string => {
  switch (level) {
    case 'critical': return '🚨';
    case 'high': return '⚠️';
    case 'medium': return '⚡';
    case 'low': return '✅';
    default: return '🔍';
  }
};

export const detectBlockchain = (address: string): BlockchainType => {
  if (BLOCKCHAIN_CONFIG.ETHEREUM.format.test(address)) {
    return 'ethereum';
  }
  if (BLOCKCHAIN_CONFIG.BITCOIN.format.test(address)) {
    return 'bitcoin';
  }
  return 'other';
};

export const formatAddress = (address: string, length: number = 6): string => {
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const formatBalance = (balance: string | number, decimals: number = 18): string => {
  const num = typeof balance === 'string' ? parseFloat(balance) : balance;
  return (num / Math.pow(10, decimals)).toFixed(4);
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidAddress = (address: string, blockchain: BlockchainType): boolean => {
  switch (blockchain) {
    case 'ethereum':
      return BLOCKCHAIN_CONFIG.ETHEREUM.format.test(address);
    case 'bitcoin':
      return BLOCKCHAIN_CONFIG.BITCOIN.format.test(address);
    default:
      return address.length > 0;
  }
};

// API utilities
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};

// Date utilities
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString();
};

// Storage utilities
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};
