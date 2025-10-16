import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // API Keys
  etherscanApiKey: process.env.ETHERSCAN_API_KEY || '',
  blockcypherToken: process.env.BLOCKCYPHER_TOKEN || '',
  infuraApiKey: process.env.INFURA_API_KEY || '',
  alchemyApiKey: process.env.ALCHEMY_API_KEY || '',
  
  // Appwrite Configuration
  appwrite: {
    endpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.APPWRITE_PROJECT_ID || '',
    apiKey: process.env.APPWRITE_API_KEY || '',
    databaseId: process.env.APPWRITE_DATABASE_ID || 'main',
    collections: {
      userProfiles: process.env.APPWRITE_USER_PROFILES_COLLECTION || 'user_profiles',
      addressBook: process.env.APPWRITE_ADDRESS_BOOK_COLLECTION || 'address_book',
      alerts: process.env.APPWRITE_ALERTS_COLLECTION || 'alerts'
    },
    buckets: {
      avatars: process.env.APPWRITE_AVATARS_BUCKET || 'avatars'
    }
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // External API Endpoints
  apis: {
    etherscan: 'https://api.etherscan.io/api',
    blockcypher: 'https://api.blockcypher.com/v1',
    infura: 'https://mainnet.infura.io/v3',
    alchemy: 'https://eth-mainnet.g.alchemy.com/v2'
  }
};

// Validate required environment variables
export const validateConfig = () => {
  const required = [
    'ETHERSCAN_API_KEY',
    'APPWRITE_PROJECT_ID',
    'APPWRITE_API_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️  Warning: Missing environment variables: ${missing.join(', ')}`);
    console.warn('⚠️  Some features may not work properly.');
  }
};

export default config;
