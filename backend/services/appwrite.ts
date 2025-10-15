import { Client, Account, Databases, ID, Query, Storage, type Models, type OAuthProvider as AppwriteOAuthProvider } from 'appwrite';
import { APPWRITE_CONFIG, type OAuthProvider } from '../config/appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_CONFIG.endpoint)
  .setProject(APPWRITE_CONFIG.projectId);

// Initialize services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Types
export interface UserProfile extends Models.Document {
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
  };
}

export interface AddressEntry extends Models.Document {
  userId: string;
  address: string;
  label?: string;
  tags?: string[];
  riskScore: number;
  lastChecked: string;
  blockchain: 'ethereum' | 'bitcoin' | 'other';
  isFavorite: boolean;
  notes?: string;
}

// Auth Service
const authService = {
  // Email/Password Authentication
  async register(email: string, password: string, name: string) {
    try {
      // Create user account
      const user = await account.create(ID.unique(), email, password, name);
      
      // Create user profile
      await databases.createDocument<UserProfile>(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.userProfilesCollectionId,
        user.$id,
        {
          userId: user.$id,
          email,
          name,
          preferences: {
            theme: 'system',
            notifications: true,
          },
        }
      );

      // Start session
      await this.login(email, password);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async loginWithOAuth(provider: OAuthProvider) {
    try {
      await account.createOAuth2Session(
        provider as AppwriteOAuthProvider,
        `${window.location.origin}/dashboard`,
        `${window.location.origin}/login`
      );
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async getSession() {
    try {
      return await account.getSession('current');
    } catch (error) {
      return null;
    }
  },
};

// User Profile Service
const userProfileService = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      return await databases.getDocument<UserProfile>(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.userProfilesCollectionId,
        userId
      );
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      return await databases.updateDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.userProfilesCollectionId,
        userId,
        updates
      );
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  async uploadAvatar(userId: string, file: File) {
    try {
      // Delete old avatar if exists
      const profile = await this.getProfile(userId);
      if (profile?.avatar) {
        try {
          await storage.deleteFile(APPWRITE_CONFIG.avatarsBucketId, profile.avatar);
        } catch (error) {
          console.warn('Error deleting old avatar:', error);
        }
      }

      // Upload new avatar
      const uploadedFile = await storage.createFile(
        APPWRITE_CONFIG.avatarsBucketId,
        ID.unique(),
        file
      );

      // Get file preview URL
      const avatarUrl = storage.getFilePreview(
        APPWRITE_CONFIG.avatarsBucketId,
        uploadedFile.$id,
        200, // width
        200  // height
      );

      // Update profile with new avatar
      await this.updateProfile(userId, { avatar: uploadedFile.$id });

      return avatarUrl;
    } catch (error) {
      console.error('Upload avatar error:', error);
      throw error;
    }
  },
};

// Address Book Service
const addressBookService = {
  async addAddress(userId: string, addressData: Omit<AddressEntry, keyof Models.Document | 'userId' | 'lastChecked'>) {
    try {
      return await databases.createDocument<AddressEntry>(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.addressBookCollectionId,
        ID.unique(),
        {
          ...addressData,
          userId,
          lastChecked: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error('Add address error:', error);
      throw error;
    }
  },

  async getAddresses(userId: string, query: string[] = []) {
    try {
      return await databases.listDocuments<AddressEntry>(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.addressBookCollectionId,
        [
          Query.equal('userId', userId),
          ...query,
        ]
      );
    } catch (error) {
      console.error('Get addresses error:', error);
      throw error;
    }
  },

  async updateAddress(documentId: string, updates: Partial<AddressEntry>) {
    try {
      return await databases.updateDocument<AddressEntry>(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.addressBookCollectionId,
        documentId,
        updates
      );
    } catch (error) {
      console.error('Update address error:', error);
      throw error;
    }
  },

  async deleteAddress(documentId: string) {
    try {
      await databases.deleteDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.addressBookCollectionId,
        documentId
      );
    } catch (error) {
      console.error('Delete address error:', error);
      throw error;
    }
  },
};

export { authService, userProfileService, addressBookService, client };
