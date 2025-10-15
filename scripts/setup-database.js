#!/usr/bin/env node

/**
 * Appwrite Database Setup Script
 *
 * This script automatically creates all necessary collections, attributes, and indexes
 * for the CryptoIntel application in your Appwrite project.
 *
 * Usage:
 * 1. Update your .env file with your Appwrite credentials
 * 2. Run: node scripts/setup-database.js
 */

const { Client, Databases, ID } = require('appwrite');
require('dotenv').config({ path: '../backend/.env' });

// Appwrite configuration
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
const DATABASE_ID = 'main';

if (!PROJECT_ID) {
  console.error('❌ REACT_APP_APPWRITE_PROJECT_ID not found in ../backend/.env');
  console.error('Please update your .env file with your Appwrite project ID');
  process.exit(1);
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

const databases = new Databases(client);

async function createCollection(name, schema) {
  try {
    console.log(`📋 Creating collection: ${name}`);

    // Create collection
    const collection = await databases.createCollection(
      DATABASE_ID,
      ID.unique(),
      name,
      schema.permissions || []
    );

    console.log(`✅ Created collection: ${name} (ID: ${collection.$id})`);

    // Create attributes
    for (const attribute of schema.attributes || []) {
      try {
        console.log(`  ➕ Adding attribute: ${attribute.key} (${attribute.type})`);

        if (attribute.type === 'string') {
          await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            attribute.key,
            attribute.size || 255,
            attribute.required || false,
            attribute.default || null,
            attribute.array || false
          );
        } else if (attribute.type === 'integer') {
          await databases.createIntegerAttribute(
            DATABASE_ID,
            collection.$id,
            attribute.key,
            attribute.required || false,
            attribute.min || 0,
            attribute.max || 100,
            attribute.default || null
          );
        } else if (attribute.type === 'boolean') {
          await databases.createBooleanAttribute(
            DATABASE_ID,
            collection.$id,
            attribute.key,
            attribute.required || false,
            attribute.default || false
          );
        } else if (attribute.type === 'email') {
          await databases.createEmailAttribute(
            DATABASE_ID,
            collection.$id,
            attribute.key,
            attribute.required || false,
            attribute.default || null
          );
        } else if (attribute.type === 'object') {
          await databases.createObjectAttribute(
            DATABASE_ID,
            collection.$id,
            attribute.key,
            attribute.required || false
          );
        } else if (attribute.type === 'array') {
          await databases.createStringArrayAttribute(
            DATABASE_ID,
            collection.$id,
            attribute.key,
            attribute.required || false
          );
        }

        console.log(`    ✅ Added attribute: ${attribute.key}`);
      } catch (error) {
        if (error.code !== 409) { // Ignore "already exists" errors
          console.error(`    ❌ Failed to add attribute ${attribute.key}:`, error.message);
        } else {
          console.log(`    ⚠️  Attribute ${attribute.key} already exists`);
        }
      }
    }

    // Create indexes
    for (const index of schema.indexes || []) {
      try {
        console.log(`  🔍 Creating index: ${index.key}`);

        await databases.createIndex(
          DATABASE_ID,
          collection.$id,
          ID.unique(),
          index.type,
          index.attributes,
          index.orders || []
        );

        console.log(`    ✅ Created index: ${index.key}`);
      } catch (error) {
        if (error.code !== 409) { // Ignore "already exists" errors
          console.error(`    ❌ Failed to create index ${index.key}:`, error.message);
        } else {
          console.log(`    ⚠️  Index ${index.key} already exists`);
        }
      }
    }

    return collection;
  } catch (error) {
    if (error.code === 409) {
      console.log(`⚠️  Collection ${name} already exists`);
      return null;
    } else {
      console.error(`❌ Failed to create collection ${name}:`, error.message);
      throw error;
    }
  }
}

async function setupDatabase() {
  console.log('🚀 Starting Appwrite database setup...\n');

  try {
    // Collection 1: User Profiles
    await createCollection('user_profiles', {
      permissions: [
        'read("role:all")',
        'write("user:*")',
        'create("role:all")'
      ],
      attributes: [
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'email', type: 'email', required: true },
        { key: 'name', type: 'string', size: 255, required: true },
        { key: 'avatar', type: 'string', size: 255, required: false },
        { key: 'preferences', type: 'object', required: false }
      ],
      indexes: [
        { key: 'userId_index', type: 'key', attributes: ['userId'] },
        { key: 'email_index', type: 'key', attributes: ['email'] }
      ]
    });

    console.log('');

    // Collection 2: Address Book
    await createCollection('address_book', {
      permissions: [
        'read("user:*")',
        'write("user:*")',
        'create("user:*")'
      ],
      attributes: [
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'address', type: 'string', size: 255, required: true },
        { key: 'label', type: 'string', size: 255, required: false },
        { key: 'tags', type: 'array', required: false },
        { key: 'riskScore', type: 'integer', required: true, min: 0, max: 100 },
        { key: 'blockchain', type: 'string', size: 50, required: true },
        { key: 'isFavorite', type: 'boolean', required: true, default: false },
        { key: 'notes', type: 'string', size: 1000, required: false }
      ],
      indexes: [
        { key: 'userId_index', type: 'key', attributes: ['userId'] },
        { key: 'address_index', type: 'key', attributes: ['address'] },
        { key: 'blockchain_index', type: 'key', attributes: ['blockchain'] },
        { key: 'favorite_index', type: 'key', attributes: ['isFavorite'] }
      ]
    });

    console.log('');

    // Collection 3: Alerts (Optional)
    await createCollection('alerts', {
      permissions: [
        'read("user:*")',
        'write("user:*")',
        'create("user:*")'
      ],
      attributes: [
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'address', type: 'string', size: 255, required: true },
        { key: 'alertType', type: 'string', size: 255, required: true },
        { key: 'message', type: 'string', size: 500, required: true },
        { key: 'read', type: 'boolean', required: true, default: false }
      ],
      indexes: [
        { key: 'userId_index', type: 'key', attributes: ['userId'] },
        { key: 'address_index', type: 'key', attributes: ['address'] },
        { key: 'read_index', type: 'key', attributes: ['read'] }
      ]
    });

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Your .env file should have:');
    console.log(`   REACT_APP_APPWRITE_PROJECT_ID=${PROJECT_ID}`);
    console.log('2. Run your app: cd frontend && npm run dev');
    console.log('3. Test the application functionality');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
