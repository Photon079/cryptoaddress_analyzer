# ⚡ Backend Quick Start (5 Minutes)

## Prerequisites
- Node.js v18+ installed
- 4 API keys ready (see `REQUIRED_API_KEYS.md`)

---

## Step 1: Install Dependencies (1 min)

```bash
cd backend
npm install
```

---

## Step 2: Configure Environment (2 min)

```bash
# Copy example file
copy .env.example .env

# Edit .env and add your keys
notepad .env
```

Add your actual API keys:
```env
ETHERSCAN_API_KEY=your_actual_key_here
BLOCKCYPHER_TOKEN=your_actual_token_here
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
```

---

## Step 3: Start Server (1 min)

```bash
npm run dev
```

Expected output:
```
🚀 Server is running on port 5000
📝 Environment: development
```

---

## Step 4: Test (1 min)

Open new terminal:

```bash
# Health check
curl http://localhost:5000/api/health

# Analyze Ethereum address
curl -X POST http://localhost:5000/api/blockchain/analyze ^
  -H "Content-Type: application/json" ^
  -d "{\"address\":\"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb\",\"blockchain\":\"ethereum\"}"
```

---

## ✅ You're Done!

Your backend is running on: **http://localhost:5000**

### Available Endpoints:
- Health: `GET /api/health`
- Analyze: `POST /api/blockchain/analyze`
- Ethereum: `POST /api/blockchain/ethereum/address`
- Bitcoin: `POST /api/blockchain/bitcoin/address`

See `API_DOCUMENTATION.md` for full API reference.

---

## 🐛 Troubleshooting

**Problem:** Module not found
```bash
npm install
```

**Problem:** API key errors
- Check `.env` file has all 4 required keys
- No spaces around `=` in `.env`
- Restart server after changing `.env`

**Problem:** Port in use
- Change `PORT=5001` in `.env`

---

## 📚 Next Steps

1. Read `API_DOCUMENTATION.md` for endpoint details
2. See `backend/README.md` for full features
3. Test different addresses
4. Connect your frontend
