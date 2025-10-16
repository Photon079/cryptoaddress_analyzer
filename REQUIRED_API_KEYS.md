# 🔑 Required API Keys - Quick Reference

## ✅ MANDATORY API Keys (You MUST provide these)

### 1. Etherscan API Key
- **Variable Name:** `ETHERSCAN_API_KEY`
- **Purpose:** Ethereum blockchain data
- **Get it from:** https://etherscan.io/apis
- **Steps:**
  1. Register at https://etherscan.io/register
  2. Login → Your profile → API-KEYs → Add
  3. Copy the key
- **Free Tier:** 100,000 calls/day
- **Cost:** FREE

### 2. BlockCypher Token
- **Variable Name:** `BLOCKCYPHER_TOKEN`
- **Purpose:** Bitcoin blockchain data
- **Get it from:** https://accounts.blockcypher.com/
- **Steps:**
  1. Sign up at https://accounts.blockcypher.com/signup
  2. Dashboard will show your token
  3. Copy the token
- **Free Tier:** 200 requests/hour
- **Cost:** FREE

### 3. Appwrite Project ID
- **Variable Name:** `APPWRITE_PROJECT_ID`
- **Purpose:** User authentication & database
- **Get it from:** https://cloud.appwrite.io/
- **Steps:**
  1. Create account at https://cloud.appwrite.io/
  2. Create new project
  3. Copy Project ID from settings
- **Cost:** FREE

### 4. Appwrite API Key
- **Variable Name:** `APPWRITE_API_KEY`
- **Purpose:** Backend server access to Appwrite
- **Get it from:** https://cloud.appwrite.io/
- **Steps:**
  1. In your Appwrite project
  2. Settings → View API Keys → Create API Key
  3. Grant all database, storage, and user permissions
  4. Copy the key (shown only once!)
- **Cost:** FREE

---

## 🔧 OPTIONAL API Keys (Recommended but not required)

### 5. Infura API Key
- **Variable Name:** `INFURA_API_KEY`
- **Purpose:** Alternative Ethereum node provider
- **Get it from:** https://infura.io/
- **Cost:** FREE (100,000 requests/day)

### 6. Alchemy API Key
- **Variable Name:** `ALCHEMY_API_KEY`
- **Purpose:** Premium Ethereum provider
- **Get it from:** https://www.alchemy.com/
- **Cost:** FREE (300M compute units/month)

---

## 📝 Your Checklist

Copy this template and fill in your actual keys:

```env
# REQUIRED KEYS - Fill these in!
ETHERSCAN_API_KEY=________________
BLOCKCYPHER_TOKEN=________________
APPWRITE_PROJECT_ID=________________
APPWRITE_API_KEY=________________

# OPTIONAL KEYS
INFURA_API_KEY=________________
ALCHEMY_API_KEY=________________
```

---

## ⚡ Quick Start

1. **Get all 4 required API keys** (takes ~30 minutes)
2. **Open:** `backend/.env`
3. **Paste your keys** in the appropriate variables
4. **Save the file**
5. **Run:** `cd backend && npm install && npm run dev`
6. **Test:** Open http://localhost:5000/api/health

---

## 🆘 Help

If you see `false` for any service in health check:
```json
{
  "services": {
    "etherscan": false,  // ❌ Check ETHERSCAN_API_KEY
    "blockcypher": false, // ❌ Check BLOCKCYPHER_TOKEN
    "appwrite": false    // ❌ Check APPWRITE credentials
  }
}
```

**Solution:** Double-check the corresponding API key in your `.env` file.

---

## 📚 Full Guides

- **Detailed setup:** See `API_KEYS_GUIDE.md`
- **Quick start:** See `SETUP_GUIDE.md`
- **API docs:** See `backend/API_DOCUMENTATION.md`

---

## 💰 Total Cost

**All required keys: $0 (100% FREE)**

The free tiers are sufficient for:
- Development and testing
- Small to medium production apps
- College projects
- Personal use
- Proof of concepts

---

## ⏱️ Estimated Time

- **Etherscan:** 5 minutes
- **BlockCypher:** 3 minutes
- **Appwrite:** 15 minutes (includes database setup)
- **Testing:** 5 minutes

**Total:** ~30 minutes
