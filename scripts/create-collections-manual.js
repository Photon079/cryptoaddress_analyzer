/**
 * Manual Appwrite Collection Creation Script
 *
 * Run this if you want to create collections programmatically
 * instead of using the dashboard.
 *
 * Usage: node scripts/create-collections-manual.js
 */

const sdk = require('node-appwrite');
require('dotenv').config({ path: './backend/.env' });

const { ID } = sdk;
const PROJECT_ID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_APPWRITE_API_KEY;
const DATABASE_ID = 'main';

console.log('🔑 Project ID:', PROJECT_ID);
console.log('🔑 API Key:', API_KEY ? API_KEY.substring(0, 20) + '...' : 'Not found');

if (!PROJECT_ID || !API_KEY) {
  console.error('❌ Missing Project ID or API Key in .env file');
  process.exit(1);
}

const client = new sdk.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new sdk.Databases(client);

async function createCollectionManually() {
  console.log('🔧 Creating collections with API key authentication...\n');

  try {
    // Collection 1: User Profiles
    console.log('📋 Creating user_profiles collection...');
    const userProfilesCollection = await databases.createCollection(
      DATABASE_ID,
      ID.unique(),
      'user_profiles',
      [
        'read("role:all")',
        'write("user:*")',
        'create("role:all")'
      ]
    );

    // Add attributes to user_profiles
    await databases.createStringAttribute(DATABASE_ID, userProfilesCollection.$id, 'userId', 255, true);
    await databases.createEmailAttribute(DATABASE_ID, userProfilesCollection.$id, 'email', true);
    await databases.createStringAttribute(DATABASE_ID, userProfilesCollection.$id, 'name', 255, true);
    await databases.createStringAttribute(DATABASE_ID, userProfilesCollection.$id, 'avatar', 255, false);
    await databases.createObjectAttribute(DATABASE_ID, userProfilesCollection.$id, 'preferences', false);

    console.log('✅ user_profiles collection created\n');

    // Collection 2: Address Book
    console.log('📋 Creating address_book collection...');
    const addressBookCollection = await databases.createCollection(
      DATABASE_ID,
      ID.unique(),
      'address_book',
      [
        'read("user:*")',
        'write("user:*")',
        'create("user:*")'
      ]
    );

    // Add attributes to address_book
    await databases.createStringAttribute(DATABASE_ID, addressBookCollection.$id, 'userId', 255, true);
    await databases.createStringAttribute(DATABASE_ID, addressBookCollection.$id, 'address', 255, true);
    await databases.createStringAttribute(DATABASE_ID, addressBookCollection.$id, 'label', 255, false);
    await databases.createStringArrayAttribute(DATABASE_ID, addressBookCollection.$id, 'tags', false);
    await databases.createIntegerAttribute(DATABASE_ID, addressBookCollection.$id, 'riskScore', true, 0, 100);
    await databases.createStringAttribute(DATABASE_ID, addressBookCollection.$id, 'blockchain', 50, true);
    await databases.createBooleanAttribute(DATABASE_ID, addressBookCollection.$id, 'isFavorite', true, false);
    await databases.createStringAttribute(DATABASE_ID, addressBookCollection.$id, 'notes', 1000, false);

    console.log('✅ address_book collection created\n');

    // Collection 3: Alerts
    console.log('📋 Creating alerts collection...');
    const alertsCollection = await databases.createCollection(
      DATABASE_ID,
      ID.unique(),
      'alerts',
      [
        'read("user:*")',
        'write("user:*")',
        'create("user:*")'
      ]
    );

    // Add attributes to alerts
    await databases.createStringAttribute(DATABASE_ID, alertsCollection.$id, 'userId', 255, true);
    await databases.createStringAttribute(DATABASE_ID, alertsCollection.$id, 'address', 255, true);
    await databases.createStringAttribute(DATABASE_ID, alertsCollection.$id, 'alertType', 255, true);
    await databases.createStringAttribute(DATABASE_ID, alertsCollection.$id, 'message', 500, true);
    await databases.createBooleanAttribute(DATABASE_ID, alertsCollection.$id, 'read', true, false);

    console.log('✅ alerts collection created\n');

    console.log('🎉 All collections created successfully!');
    console.log('\n📋 Collection IDs:');
    console.log(`user_profiles: ${userProfilesCollection.$id}`);
    console.log(`address_book: ${addressBookCollection.$id}`);
    console.log(`alerts: ${alertsCollection.$id}`);
    console.log('\n🚀 Your database is ready!');

  } catch (error) {
    console.error('❌ Failed to create collections:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

createCollectionManually();
