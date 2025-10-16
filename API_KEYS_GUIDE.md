# 🔑 Complete API Keys Setup Guide

This guide will walk you through obtaining all the necessary API keys for the CryptoAddress Analyzer backend.

---

## Required API Keys (Must Have)

### 1. ✅ Etherscan API Key

**Purpose:** Ethereum blockchain data, transactions, smart contracts

**Free Tier:** 
- 5 calls/second
- 100,000 calls/day
- Sufficient for development and small-scale production

**How to Get:**

1. **Create Account**
   - Go to: https://etherscan.io/register
   - Fill in your details
   - Verify your email

2. **Generate API Key**
   - Login to your account
   - Click on your username (top right)
   - Select "API-KEYs" from dropdown
   - Click "Add" button
   - Give it a name (e.g., "CryptoAnalyzer")
   - Copy the API key

3. **Add to `.env` file**
   ```env
   ETHERSCAN_API_KEY=YOUR_KEY_HERE
   ```

**Example Key Format:** `ABCDEF1234567890ABCDEF1234567890AB`

**Alternative Networks:**
- BscScan (Binance Smart Chain): https://bscscan.com/apis
- PolygonScan: https://polygonscan.com/apis
- Similar process for all networks

---

### 2. ✅ BlockCypher Token

**Purpose:** Bitcoin blockchain data, transactions, UTXO tracking

**Free Tier:**
- 200 requests/hour
- 3 requests/second
- Good for development

**How to Get:**

1. **Sign Up**
   - Go to: https://accounts.blockcypher.com/signup
   - Enter email and create password
   - Verify your email

2. **Get Token**
   - Login to dashboard: https://accounts.blockcypher.com/
   - Your token is displayed on the main dashboard
   - Copy the token

3. **Add to `.env` file**
   ```env
   BLOCKCYPHER_TOKEN=YOUR_TOKEN_HERE
   ```

**Example Token Format:** `abc123def456ghi789jkl012mno345pq`

**Note:** You can also use the API without a token, but with severe rate limits (3 requests/second, 200/hour shared across all users).

---

### 3. ✅ Appwrite Project

**Purpose:** User authentication, database, file storage

**Free Tier:**
- 75,000 requests/month
- 2 GB bandwidth
- 2 GB storage
- Perfect for small to medium projects

**How to Get:**

1. **Create Account**
   - Go to: https://cloud.appwrite.io/
   - Sign up with email or GitHub
   - Verify your email

2. **Create Project**
   - Click "Create Project"
   - Enter project name: "CryptoAddressAnalyzer"
   - Click "Create"

3. **Get Project ID**
   - You'll see it in the URL: `https://cloud.appwrite.io/console/project-[PROJECT_ID]`
   - Also visible in Settings → Project ID
   - Copy this ID

4. **Create API Key**
   - Go to "Settings" → "View API Keys"
   - Click "Create API Key"
   - Name: "Backend Server"
   - Expiration: Never (or set as needed)
   - Scopes: Select all database, storage, and users permissions
   - Click "Create"
   - Copy the API key (shown only once!)

5. **Create Database and Collections**
   
   a. **Create Database:**
   - Go to "Databases" tab
   - Click "Create Database"
   - Database ID: `main`
   - Name: "Main Database"
   
   b. **Create Collections:**
   
   **Collection 1: user_profiles**
   - Collection ID: `user_profiles`
   - Attributes:
     - `userId` (string, required, size: 256)
     - `email` (string, required, size: 320)
     - `name` (string, required, size: 256)
     - `avatar` (string, optional, size: 256)
     - `preferences` (string, optional, size: 1000) [JSON]
   
   **Collection 2: address_book**
   - Collection ID: `address_book`
   - Attributes:
     - `userId` (string, required, size: 256)
     - `address` (string, required, size: 256)
     - `label` (string, optional, size: 100)
     - `tags` (string, optional, size: 500) [JSON array]
     - `riskScore` (integer, required)
     - `lastChecked` (string, required, size: 50)
     - `blockchain` (string, required, size: 50)
     - `isFavorite` (boolean, default: false)
     - `notes` (string, optional, size: 1000)
   
   **Collection 3: alerts**
   - Collection ID: `alerts`
   - Attributes:
     - `userId` (string, required, size: 256)
     - `address` (string, required, size: 256)
     - `alertType` (string, required, size: 50)
     - `threshold` (string, optional, size: 100)
     - `isActive` (boolean, default: true)
   
   c. **Create Storage Bucket:**
   - Go to "Storage" tab
   - Click "Create Bucket"
   - Bucket ID: `avatars`
   - Name: "User Avatars"
   - File size limit: 5MB
   - Allowed extensions: jpg, jpeg, png, gif, webp

6. **Add to `.env` file**
   ```env
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
   APPWRITE_API_KEY=YOUR_API_KEY
   APPWRITE_DATABASE_ID=main
   APPWRITE_USER_PROFILES_COLLECTION=user_profiles
   APPWRITE_ADDRESS_BOOK_COLLECTION=address_book
   APPWRITE_ALERTS_COLLECTION=alerts
   APPWRITE_AVATARS_BUCKET=avatars
   ```

---

## Optional API Keys (Recommended for Enhanced Features)

### 4. 🔧 Infura API Key (Optional)

**Purpose:** Alternative Ethereum node provider, enhanced reliability

**Free Tier:**
- 100,000 requests/day
- 3 requests/second

**How to Get:**

1. Go to: https://infura.io/register
2. Verify email
3. Create new project
4. Copy API key from project settings
5. Add to `.env`:
   ```env
   INFURA_API_KEY=YOUR_INFURA_KEY
   ```

---

### 5. 🔧 Alchemy API Key (Optional)

**Purpose:** Premium Ethereum node provider, advanced features

**Free Tier:**
- 300M compute units/month
- Enhanced APIs and webhooks

**How to Get:**

1. Go to: https://dashboard.alchemy.com/signup
2. Create account
3. Create new app (Ethereum Mainnet)
4. Copy API key
5. Add to `.env`:
   ```env
   ALCHEMY_API_KEY=YOUR_ALCHEMY_KEY
   ```

---

## Quick Setup Checklist

- [ ] **Etherscan** - Register and get API key
- [ ] **BlockCypher** - Sign up and copy token
- [ ] **Appwrite** - Create project, get Project ID and API Key
- [ ] **Appwrite Database** - Create `main` database
- [ ] **Appwrite Collections** - Create 3 collections (user_profiles, address_book, alerts)
- [ ] **Appwrite Storage** - Create `avatars` bucket
- [ ] **Environment File** - Copy all keys to `backend/.env`
- [ ] **Test** - Run `npm run dev` and check `/api/health` endpoint

---

## Complete `.env` File Template

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# API Keys - REQUIRED
ETHERSCAN_API_KEY=ABCDEF1234567890ABCDEF1234567890AB
BLOCKCYPHER_TOKEN=abc123def456ghi789jkl012mno345pq

# Appwrite Configuration - REQUIRED
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=65a1b2c3d4e5f6
APPWRITE_API_KEY=standard_abc123def456...
APPWRITE_DATABASE_ID=main
APPWRITE_USER_PROFILES_COLLECTION=user_profiles
APPWRITE_ADDRESS_BOOK_COLLECTION=address_book
APPWRITE_ALERTS_COLLECTION=alerts
APPWRITE_AVATARS_BUCKET=avatars

# Optional API Keys
INFURA_API_KEY=1234567890abcdef1234567890abcdef
ALCHEMY_API_KEY=abcd-efgh-ijkl-mnop-qrstuvwxyz12

# Logging
LOG_LEVEL=info
```

---

## Testing Your API Keys

After setting up all keys, test them:

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start server
npm run dev

# In another terminal, test health endpoint
curl http://localhost:5000/api/health
```

You should see all services showing `true`:
```json
{
  "services": {
    "etherscan": true,
    "blockcypher": true,
    "appwrite": true
  }
}
```

---

## Common Issues & Solutions

### ❌ "Etherscan API key not configured"
- **Solution:** Check `.env` file has `ETHERSCAN_API_KEY` set
- Ensure no spaces around `=` sign
- Restart the server after changing `.env`

### ❌ "Rate limit exceeded"
- **Solution:** Wait for rate limit window to reset
- Consider upgrading to paid tier
- Implement caching to reduce API calls

### ❌ "Appwrite authentication failed"
- **Solution:** Verify Project ID and API Key are correct
- Check API key has proper permissions
- Ensure database and collections are created

### ❌ "Address not found" (BlockCypher)
- **Solution:** Verify Bitcoin address format is correct
- Some addresses may not exist on blockchain
- Try a known address like `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` (genesis)

---

## Security Best Practices

1. **Never commit `.env` file to git**
   - Already in `.gitignore`
   - Use `.env.example` for templates

2. **Rotate API keys regularly**
   - Especially for production
   - Set expiration dates where possible

3. **Use environment-specific keys**
   - Development keys for local testing
   - Production keys for deployment

4. **Monitor API usage**
   - Check dashboards regularly
   - Set up alerts for quota limits
   - Review access logs

5. **Restrict API key permissions**
   - Only grant necessary scopes
   - Use read-only keys where possible

---

## Upgrading to Paid Plans (Optional)

If you need higher limits:

- **Etherscan Pro:** $99-499/month (100-1000 calls/sec)
- **BlockCypher Premium:** Contact for pricing
- **Appwrite Pro:** $15/month (more resources)
- **Infura Growth:** $50/month (10M requests/day)
- **Alchemy Growth:** $49/month (enhanced features)

---

## Support Links

- **Etherscan:** https://docs.etherscan.io/
- **BlockCypher:** https://www.blockcypher.com/dev/
- **Appwrite:** https://appwrite.io/docs
- **Infura:** https://docs.infura.io/
- **Alchemy:** https://docs.alchemy.com/

---

## Summary

**Time to complete:** ~30-45 minutes

**Total cost:** $0 (all free tiers)

**You will need:**
1. 3 email addresses (or use same for all)
2. Etherscan API key
3. BlockCypher token  
4. Appwrite project with database setup

Once complete, your backend will be fully functional! 🎉
