# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints currently don't require authentication. User-specific endpoints (saved addresses) will require Appwrite authentication in future updates.

## Rate Limiting
- General endpoints: 100 requests per 15 minutes per IP
- Blockchain endpoints: 20 requests per minute per IP

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Health Endpoints

### GET /health
Check server health and API key configuration status.

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "services": {
    "etherscan": true,
    "blockcypher": true,
    "appwrite": true
  },
  "memory": {
    "used": 45.23,
    "total": 128.50,
    "unit": "MB"
  }
}
```

### GET /health/ping
Simple ping endpoint.

**Response:**
```json
{
  "success": true,
  "message": "pong"
}
```

---

## Blockchain Endpoints

### POST /blockchain/analyze
Comprehensive address analysis including data and risk assessment.

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "blockchain": "ethereum"
}
```

**Parameters:**
- `address` (required): Cryptocurrency address
- `blockchain` (optional): "ethereum" or "bitcoin" (auto-detected if not provided)

**Response:**
```json
{
  "success": true,
  "data": {
    "addressData": {
      "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "balance": "1234567890000000000",
      "balanceEth": "1.234567",
      "transactionCount": 42,
      "firstSeen": "2023-01-15T10:30:00.000Z",
      "lastSeen": "2024-01-15T10:30:00.000Z",
      "isContract": false
    },
    "riskAssessment": {
      "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "blockchain": "ethereum",
      "riskScore": 35,
      "riskLevel": "medium",
      "factors": [
        "Relatively new address (< 90 days)",
        "Low transaction count"
      ],
      "lastUpdated": "2024-01-15T10:30:00.000Z",
      "details": {
        "ageScore": 40,
        "transactionScore": 50,
        "balanceScore": 30,
        "contractScore": 0,
        "activityScore": 0
      }
    }
  }
}
```

---

## Ethereum Endpoints

### POST /blockchain/ethereum/address
Get Ethereum address information.

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "balance": "1234567890000000000",
    "balanceEth": "1.234567",
    "transactionCount": 42,
    "firstSeen": "2023-01-15T10:30:00.000Z",
    "lastSeen": "2024-01-15T10:30:00.000Z",
    "isContract": false
  }
}
```

### POST /blockchain/ethereum/transactions
Get Ethereum address transactions.

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "transactions": [
      {
        "hash": "0x123...",
        "from": "0xabc...",
        "to": "0xdef...",
        "value": "1000000000000000000",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "blockNumber": "12345678",
        "gasUsed": "21000",
        "gasPrice": "50000000000"
      }
    ],
    "count": 10
  }
}
```

### POST /blockchain/ethereum/contract
Get smart contract information.

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isContract": true,
    "creator": "0xabc...",
    "txHash": "0x123..."
  }
}
```

### POST /blockchain/ethereum/token-balance
Get ERC20 token balance.

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "contractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "contractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "balance": "1000000"
  }
}
```

---

## Bitcoin Endpoints

### POST /blockchain/bitcoin/address
Get Bitcoin address information.

**Request Body:**
```json
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "balance": 6800000000,
    "balanceBtc": "68.00000000",
    "totalReceived": 6800000000,
    "totalSent": 0,
    "transactionCount": 1,
    "unconfirmedBalance": 0,
    "firstSeen": null,
    "lastSeen": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /blockchain/bitcoin/transactions
Get Bitcoin address transactions.

**Request Body:**
```json
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "transactions": [
      {
        "hash": "4a5e1e...",
        "confirmed": "2009-01-03T18:15:05.000Z",
        "received": "2009-01-03T18:15:05.000Z",
        "total": 5000000000,
        "fees": 0,
        "inputs": [],
        "outputs": [
          {
            "addresses": ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"],
            "value": 5000000000
          }
        ]
      }
    ],
    "count": 1
  }
}
```

---

## Risk Assessment

### POST /blockchain/risk-assessment
Assess risk for a cryptocurrency address.

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "blockchain": "ethereum"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "blockchain": "ethereum",
    "riskScore": 35,
    "riskLevel": "medium",
    "factors": [
      "Relatively new address (< 90 days)",
      "Low transaction count"
    ],
    "lastUpdated": "2024-01-15T10:30:00.000Z",
    "details": {
      "ageScore": 40,
      "transactionScore": 50,
      "balanceScore": 30,
      "contractScore": 0,
      "activityScore": 0
    }
  }
}
```

**Risk Levels:**
- `low`: 0-29 score
- `medium`: 30-59 score
- `high`: 60-79 score
- `critical`: 80-100 score

**Risk Factors Considered:**
1. **Age** (25% weight): Newer addresses are riskier
2. **Transaction Count** (25% weight): Very low or very high is suspicious
3. **Balance** (20% weight): Extremely high balances increase risk
4. **Contract Status** (15% weight, Ethereum only): Contracts have additional risk
5. **Activity** (15% weight): Irregular patterns may indicate risk

---

## Address Management Endpoints

### GET /addresses/saved
Get user's saved addresses (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Saved addresses endpoint - requires authentication",
  "data": []
}
```

### POST /addresses/save
Save an address to user's collection (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Save address endpoint - requires authentication"
}
```

### DELETE /addresses/:id
Delete a saved address (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Delete address endpoint - requires authentication"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Address or resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Example Usage

### cURL Examples

```bash
# Health check
curl http://localhost:5000/api/health

# Analyze Ethereum address
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "blockchain": "ethereum"
  }'

# Get Ethereum transactions
curl -X POST "http://localhost:5000/api/blockchain/ethereum/transactions?limit=5" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }'

# Bitcoin address analysis
curl -X POST http://localhost:5000/api/blockchain/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "blockchain": "bitcoin"
  }'

# Risk assessment
curl -X POST http://localhost:5000/api/blockchain/risk-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "blockchain": "ethereum"
  }'
```

### JavaScript/Axios Examples

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Analyze address
async function analyzeAddress(address, blockchain) {
  const response = await axios.post(`${API_BASE}/blockchain/analyze`, {
    address,
    blockchain
  });
  return response.data;
}

// Get transactions
async function getTransactions(address, blockchain, limit = 10) {
  const endpoint = blockchain === 'ethereum' 
    ? 'ethereum/transactions' 
    : 'bitcoin/transactions';
  
  const response = await axios.post(
    `${API_BASE}/blockchain/${endpoint}?limit=${limit}`,
    { address }
  );
  return response.data;
}

// Usage
const result = await analyzeAddress(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  'ethereum'
);
console.log(result);
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Ethereum balances are in Wei (divide by 10^18 for ETH)
- Bitcoin balances are in Satoshis (divide by 10^8 for BTC)
- Transaction limits are capped at 50 per request
- Rate limits reset after the specified time window
