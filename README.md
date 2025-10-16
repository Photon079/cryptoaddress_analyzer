# 🔐 CryptoAddress Analyzer

Complete cryptocurrency address analysis platform with risk assessment, transaction tracking, and multi-blockchain support.

## 🌟 Features

- **Multi-Blockchain Support**
  - ✅ Ethereum address analysis
  - ✅ Bitcoin address analysis
  - 🔜 More chains coming soon

- **Comprehensive Analysis**
  - Real-time balance checking
  - Transaction history
  - Smart contract detection
  - Risk scoring algorithm
  - Address age tracking

- **Modern Tech Stack**
  - React + TypeScript frontend
  - Node.js + Express backend
  - Beautiful UI with Tailwind CSS
  - Type-safe APIs
  - Production-ready architecture

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cryptoaddress_analyzer
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your API keys
npm run dev
```

3. **Setup Frontend** (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. **Open Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

**See `SETUP_GUIDE.md` for detailed instructions!**

## 🔑 Required API Keys

You need to obtain these API keys (all FREE):

1. **Etherscan API Key** - https://etherscan.io/apis
2. **BlockCypher Token** - https://accounts.blockcypher.com/
3. **Appwrite Project** - https://cloud.appwrite.io/

**See `REQUIRED_API_KEYS.md` and `API_KEYS_GUIDE.md` for step-by-step instructions!**

## 📁 Project Structure

```
cryptoaddress_analyzer/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Custom middleware
│   └── README.md
├── frontend/            # React + TypeScript UI
│   └── src/
├── shared/              # Shared utilities
├── docs/                # Documentation
└── scripts/             # Utility scripts
```

## 📡 API Endpoints

### Blockchain Analysis
- `POST /api/blockchain/analyze` - Comprehensive address analysis
- `POST /api/blockchain/ethereum/address` - Ethereum data
- `POST /api/blockchain/bitcoin/address` - Bitcoin data
- `POST /api/blockchain/risk-assessment` - Risk scoring

### Health
- `GET /api/health` - Server status

**Full API documentation: `backend/API_DOCUMENTATION.md`**

## 🎯 Example Usage

### Analyze Ethereum Address
```bash
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb","blockchain":"ethereum"}'
```

### Analyze Bitcoin Address
```bash
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa","blockchain":"bitcoin"}'
```

## 🔒 Security Features

- Helmet.js security headers
- CORS protection
- Rate limiting
- Input validation
- Environment variable protection
- Safe error handling

## 📚 Documentation

- **Setup Guide** - `SETUP_GUIDE.md`
- **API Keys Guide** - `API_KEYS_GUIDE.md`
- **Required Keys** - `REQUIRED_API_KEYS.md`
- **API Documentation** - `backend/API_DOCUMENTATION.md`
- **Backend README** - `backend/README.md`
- **Quick Start** - `backend/QUICK_START.md`

## 🛠️ Development

### Backend Commands
```bash
cd backend
npm run dev      # Development with hot reload
npm run build    # Build for production
npm start        # Start production server
```

### Frontend Commands
```bash
cd frontend
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test Ethereum analysis
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{"address":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb","blockchain":"ethereum"}'
```

## 🚀 Deployment

### Backend
- Railway: https://railway.app/
- Render: https://render.com/
- Heroku: https://heroku.com/

### Frontend
- Vercel: https://vercel.com/
- Netlify: https://netlify.com/
- GitHub Pages

**See `backend/README.md` for deployment details**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 🆘 Support

- **Documentation**: See `docs/` folder
- **Issues**: Open a GitHub issue
- **API Keys Help**: See `API_KEYS_GUIDE.md`

## 🎓 Educational Project

This project is designed for educational purposes and demonstrates:
- Full-stack TypeScript development
- Blockchain API integration
- Risk assessment algorithms
- Modern web development practices
- Production-ready architecture

## ⚡ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js
- Express
- TypeScript
- Axios
- Winston (logging)
- Joi (validation)
- Helmet (security)

**APIs:**
- Etherscan (Ethereum)
- BlockCypher (Bitcoin)
- Appwrite (Auth & Database)

## 🔮 Roadmap

- [x] Ethereum support
- [x] Bitcoin support
- [x] Risk assessment
- [ ] User authentication
- [ ] Address bookmarks
- [ ] Email alerts
- [ ] Multi-chain expansion
- [ ] Advanced analytics
- [ ] Mobile app

---

Made with ❤️ for the crypto community
