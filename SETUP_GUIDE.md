# 🚀 Quick Start Guide - CryptoAddress Analyzer

Complete setup guide for getting your cryptocurrency address analyzer running in minutes!

---

## 📋 Prerequisites

- **Node.js** v18+ installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)
- Web browser (Chrome, Firefox, Edge, etc.)

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Backend Dependencies

```bash
# Open terminal/command prompt
cd backend
npm install
```

### Step 2: Configure Environment Variables

```bash
# Copy the example file
copy .env.example .env

# Open .env and add your API keys (see API_KEYS_GUIDE.md for details)
```

**Minimum Required Keys:**
- `ETHERSCAN_API_KEY` - Get from https://etherscan.io/apis
- `BLOCKCYPHER_TOKEN` - Get from https://accounts.blockcypher.com/
- `APPWRITE_PROJECT_ID` - Get from https://cloud.appwrite.io/
- `APPWRITE_API_KEY` - Get from https://cloud.appwrite.io/

### Step 3: Start Backend Server

```bash
# Still in backend folder
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📝 Environment: development
🌐 Frontend URL: http://localhost:5173
```

### Step 4: Test Backend (New Terminal)

```bash
# Open a new terminal
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "services": {
    "etherscan": true,
    "blockcypher": true,
    "appwrite": true
  }
}
```

### Step 5: Install Frontend Dependencies

```bash
# Navigate to frontend folder
cd ../frontend
npm install
```

### Step 6: Start Frontend

```bash
npm run dev
```

You should see:
```
VITE ready in 1234 ms
➜  Local:   http://localhost:5173/
```

### Step 7: Open Application

Open your browser and go to: **http://localhost:5173/**

---

## 🎯 Testing Your Setup

### Test 1: Analyze Ethereum Address

1. Go to the Search page
2. Enter: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
3. Select "Ethereum"
4. Click "Analyze"

You should see balance, transaction count, and risk assessment!

### Test 2: Analyze Bitcoin Address

1. Enter: `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` (Satoshi's address)
2. Select "Bitcoin"
3. Click "Analyze"

---

## 📁 Project Structure

```
cryptoaddress_analyzer/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Main entry point
│   ├── .env               # Environment variables (YOU CREATE)
│   ├── .env.example       # Template
│   ├── package.json       # Dependencies
│   └── README.md          # Backend docs
│
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── config/       # Frontend config
│   │   └── App.tsx       # Main app
│   └── package.json      # Dependencies
│
├── shared/               # Shared utilities
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Shared functions
│
├── API_KEYS_GUIDE.md    # How to get API keys
└── SETUP_GUIDE.md       # This file
```

---

## 🔑 API Keys You Need

### Required (3 keys)

1. **Etherscan API Key**
   - Sign up: https://etherscan.io/register
   - Get key: Account → API-KEYs → Add
   - Free: 100,000 calls/day

2. **BlockCypher Token**
   - Sign up: https://accounts.blockcypher.com/signup
   - Token shown on dashboard
   - Free: 200 requests/hour

3. **Appwrite**
   - Sign up: https://cloud.appwrite.io/
   - Create project
   - Get Project ID and API Key
   - Free: 75,000 requests/month

**See `API_KEYS_GUIDE.md` for detailed step-by-step instructions!**

---

## 🛠️ Common Commands

### Backend

```bash
cd backend

# Development (with auto-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check health
curl http://localhost:5000/api/health
```

### Frontend

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔍 Available API Endpoints

### Health Check
- `GET /api/health` - Server status

### Blockchain Analysis
- `POST /api/blockchain/analyze` - Comprehensive analysis
- `POST /api/blockchain/ethereum/address` - Ethereum data
- `POST /api/blockchain/bitcoin/address` - Bitcoin data
- `POST /api/blockchain/risk-assessment` - Risk scoring

**Full API docs:** `backend/API_DOCUMENTATION.md`

---

## ❓ Troubleshooting

### Backend won't start

**Error:** "Cannot find module 'express'"
```bash
cd backend
npm install
```

**Error:** "API key not configured"
- Check `.env` file exists in `backend/` folder
- Verify all required keys are set
- No spaces around `=` in `.env`
- Restart server after changing `.env`

### Frontend won't connect to backend

**Error:** "Network Error" or "Failed to fetch"
- Make sure backend is running (`npm run dev` in backend folder)
- Check backend is on port 5000
- Verify CORS settings in `backend/src/server.ts`

### API returns errors

**Error:** "Rate limit exceeded"
- Wait a few minutes (free tiers have limits)
- Check API provider dashboards
- Consider implementing caching

**Error:** "Invalid API key"
- Verify API keys are correct (no extra spaces)
- Check keys haven't expired
- Regenerate keys if needed

### Health endpoint shows false for services

```json
{
  "services": {
    "etherscan": false,  // ❌
    "blockcypher": false, // ❌
    "appwrite": false    // ❌
  }
}
```

**Solution:**
- Check each API key is correctly set in `.env`
- Restart the backend server
- Test each API key on their respective websites

---

## 🎨 Features Overview

### Current Features
✅ Ethereum address analysis  
✅ Bitcoin address analysis  
✅ Risk assessment engine  
✅ Transaction history  
✅ Smart contract detection  
✅ Beautiful modern UI  
✅ Responsive design  

### Coming Soon (Requires Auth Setup)
🔜 User authentication  
🔜 Save addresses  
🔜 Favorites  
🔜 Alerts & notifications  
🔜 Address labels & tags  

---

## 🚀 Production Deployment

### Backend (Node.js)

**Option 1: Railway**
1. Sign up at https://railway.app/
2. Connect GitHub repo
3. Add environment variables
4. Deploy

**Option 2: Render**
1. Sign up at https://render.com/
2. Create new Web Service
3. Connect repo
4. Add environment variables
5. Deploy

**Option 3: Heroku**
1. Install Heroku CLI
2. `heroku create app-name`
3. `heroku config:set KEY=value` (for each env var)
4. `git push heroku main`

### Frontend (React)

**Option 1: Vercel**
```bash
npm install -g vercel
cd frontend
vercel
```

**Option 2: Netlify**
```bash
cd frontend
npm run build
# Drag 'dist' folder to netlify.app
```

**Option 3: GitHub Pages**
- Enable GitHub Pages in repo settings
- Push to gh-pages branch

---

## 📚 Additional Resources

- **Backend README:** `backend/README.md`
- **API Documentation:** `backend/API_DOCUMENTATION.md`
- **API Keys Guide:** `API_KEYS_GUIDE.md`
- **Main README:** `README.md`

---

## 🆘 Getting Help

### Documentation
- Etherscan API: https://docs.etherscan.io/
- BlockCypher: https://www.blockcypher.com/dev/
- Appwrite: https://appwrite.io/docs

### Common Issues
1. **Port already in use:** Change `PORT=5000` to `PORT=5001` in `.env`
2. **Module not found:** Run `npm install` in the correct folder
3. **CORS errors:** Check `FRONTEND_URL` in backend `.env`

---

## ✅ Setup Checklist

Backend Setup:
- [ ] Node.js installed
- [ ] `cd backend` and run `npm install`
- [ ] Create `.env` file
- [ ] Add Etherscan API key
- [ ] Add BlockCypher token
- [ ] Add Appwrite credentials
- [ ] Run `npm run dev`
- [ ] Test `http://localhost:5000/api/health`

Frontend Setup:
- [ ] `cd frontend` and run `npm install`
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:5173`
- [ ] Test analyzing an address

---

## 🎉 You're Ready!

Your CryptoAddress Analyzer is now running!

**Next Steps:**
1. Try analyzing different addresses
2. Explore the API endpoints
3. Customize the frontend UI
4. Add authentication features
5. Deploy to production

**Happy coding!** 🚀
