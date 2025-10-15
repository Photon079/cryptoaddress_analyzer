// Appwrite configuration - shared between frontend and backend
import type { AppwriteConfig } from './types';

export const APPWRITE_CONFIG: AppwriteConfig = {
  // Replace with your Appwrite endpoint
  endpoint: 'https://cloud.appwrite.io/v1',
  // Replace with your project ID from Appwrite
  projectId: (import.meta as any)?.env?.VITE_APPWRITE_PROJECT_ID || 'crypto-address-intel',
  // Collection IDs (you'll create these in Appwrite)
  databaseId: 'main',
  userProfilesCollectionId: 'user_profiles',
  addressBookCollectionId: 'address_book',
  alertsCollectionId: 'alerts',
  // Storage bucket IDs
  avatarsBucketId: 'avatars',
};

// OAuth providers configuration
export const OAUTH_PROVIDERS = {
  google: {
    name: 'google',
    label: 'Google',
  },
  github: {
    name: 'github',
    label: 'GitHub',
  },
} as const;

export type OAuthProvider = keyof typeof OAUTH_PROVIDERS;

export interface OAuthProviderConfig {
  name: string;
  label: string;
}

export const getOAuthProviderConfig = (provider: OAuthProvider): OAuthProviderConfig => {
  return OAUTH_PROVIDERS[provider];
};

// Environment variable helpers
export const getEnvVar = (key: string, defaultValue?: string): string => {
  if (typeof window !== 'undefined') {
    // Browser environment - use import.meta.env for Vite
    return (import.meta as any).env?.[`VITE_${key}`] || defaultValue || '';
  }
  // Node.js environment - use process.env
  return process.env[key] || defaultValue || '';
};

// Validation helpers
export const validateConfig = (): boolean => {
  const required = ['endpoint', 'projectId'];
  return required.every(key => APPWRITE_CONFIG[key as keyof AppwriteConfig]);
};
