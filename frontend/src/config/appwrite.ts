// Appwrite configuration
import type { AppwriteConfig } from '../../../shared/types';

export const APPWRITE_CONFIG: AppwriteConfig = {
  // Replace with your Appwrite endpoint
  endpoint: 'https://cloud.appwrite.io/v1',
  // Replace with your project ID from Appwrite
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'crypto-address-intel',
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
