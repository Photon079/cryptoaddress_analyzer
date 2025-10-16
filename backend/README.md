# CryptoAddress Analyzer - Backend API

Complete backend infrastructure for cryptocurrency address analysis and risk assessment.

## 🚀 Features

- **Ethereum Address Analysis** - Balance, transactions, contract detection via Etherscan API
- **Bitcoin Address Analysis** - Balance, transactions, UTXO tracking via BlockCypher API
- **Risk Assessment Engine** - Multi-factor risk scoring algorithm
- **Rate Limiting** - Protection against API abuse
- **Error Handling** - Comprehensive error management
- **Logging** - Winston-based structured logging
- **TypeScript** - Full type safety
- **Security** - Helmet, CORS, input validation

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API Keys (see below)

## 🔑 Required API Keys

You need to obtain the following API keys manually:

### 1. Etherscan API Key (REQUIRED)
- **Website**: https://etherscan.io/apis
- **Steps**:
  1. Create an account at https://etherscan.io/register
  2. Go to "API-KEYs" in your profile
  3. Click "Add" to create a new API key
  4. Copy the key to your `.env` file
- **Free Tier**: 5 calls/second, 100,000 calls/day
- **Used For**: Ethereum address data, transactions, smart contract info

### 2. BlockCypher Token (REQUIRED)
- **Website**: https://www.blockcypher.com/
- **Steps**:
  1. Sign up at https://accounts.blockcypher.com/signup
  2. Go to your dashboard
  3. Copy your API token
  4. Add to your `.env` file
- **Free Tier**: 200 requests/hour, 3 requests/second
- **Used For**: Bitcoin address data and transactions

### 3. Appwrite (REQUIRED)
- **Website**: https://cloud.appwrite.io/
- **Steps**:
  1. Create account at https://cloud.appwrite.io/
  2. Create a new project
  3. Go to Settings → View API Keys
  4. Create a new API key with appropriate permissions
  5. Copy Project ID and API Key to `.env`
- **Free Tier**: Generous free tier available
- **Used For**: User authentication, database, storage

### 4. Optional API Keys

#### Infura (OPTIONAL - Enhanced Ethereum features)
- **Website**: https://infura.io/
- **Steps**:
  1. Sign up at https://infura.io/register
  2. Create a new project
  3. Copy the API key
- **Free Tier**: 100,000 requests/day

#### Alchemy (OPTIONAL - Alternative Ethereum provider)
- **Website**: https://www.alchemy.com/
- **Steps**:
  1. Sign up at https://dashboard.alchemy.com/signup
  2. Create a new app
  3. Copy the API key
- **Free Tier**: 300M compute units/month

## 🛠️ Installation

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

4. **Edit `.env` file and add your API keys**
```env
ETHERSCAN_API_KEY=your_actual_key_here
BLOCKCYPHER_TOKEN=your_actual_token_here
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
```

## 🏃 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status
- `GET /api/health/ping` - Simple ping endpoint

### Blockchain Analysis

#### Comprehensive Analysis
```http
POST /api/blockchain/analyze
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "blockchain": "ethereum"
}
```

#### Ethereum Endpoints
- `POST /api/blockchain/ethereum/address` - Get address data
- `POST /api/blockchain/ethereum/transactions` - Get transactions
- `POST /api/blockchain/ethereum/contract` - Get contract info
- `POST /api/blockchain/ethereum/token-balance` - Get ERC20 token balance

#### Bitcoin Endpoints
- `POST /api/blockchain/bitcoin/address` - Get address data
- `POST /api/blockchain/bitcoin/transactions` - Get transactions

#### Risk Assessment
```http
POST /api/blockchain/risk-assessment
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "blockchain": "ethereum"
}
```

### Address Management
- `GET /api/addresses/saved` - Get saved addresses (requires auth)
- `POST /api/addresses/save` - Save an address (requires auth)
- `DELETE /api/addresses/:id` - Delete saved address (requires auth)

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── server.ts        # Main server file
├── logs/                # Log files
├── .env                 # Environment variables
├── .env.example         # Environment template
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Joi schema validation
- **Error Handling** - Safe error responses

## 📊 Logging

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only
- `exceptions.log` - Uncaught exceptions
- `rejections.log` - Unhandled promise rejections

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Analyze Ethereum address
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb","blockchain":"ethereum"}'

# Analyze Bitcoin address
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa","blockchain":"bitcoin"}'
```

### Using Postman

Import the API endpoints and test with Postman or similar tools.

## 🐛 Troubleshooting

### API Key Errors
- Verify all required API keys are set in `.env`
- Check API key validity on provider websites
- Ensure no extra spaces in `.env` file

### Rate Limit Errors
- Free tiers have limited requests
- Implement caching for frequently accessed addresses
- Consider upgrading API plans for production

### Connection Errors
- Ensure backend server is running
- Check frontend CORS configuration
- Verify API endpoint URLs

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | Environment (development/production) |
| `FRONTEND_URL` | No | Frontend URL for CORS |
| `ETHERSCAN_API_KEY` | **Yes** | Etherscan API key |
| `BLOCKCYPHER_TOKEN` | **Yes** | BlockCypher token |
| `APPWRITE_PROJECT_ID` | **Yes** | Appwrite project ID |
| `APPWRITE_API_KEY` | **Yes** | Appwrite API key |
| `INFURA_API_KEY` | No | Infura API key (optional) |
| `ALCHEMY_API_KEY` | No | Alchemy API key (optional) |

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use production API keys
- [ ] Configure proper CORS origins
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Set up process manager (PM2)
- [ ] Configure monitoring and alerts
- [ ] Set up automated backups

### Deploy with PM2
```bash
npm install -g pm2
npm run build
pm2 start dist/server.js --name crypto-backend
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and add tests for new features.
