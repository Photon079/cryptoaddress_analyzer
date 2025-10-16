import express from 'express';
import {
  analyzeAddress,
  getEthereumAddress,
  getBitcoinAddress,
  getEthereumTransactions,
  getBitcoinTransactions,
  assessRisk,
  getContractInfo,
  getTokenBalance
} from '../controllers/blockchain.controller.js';
import { validateRequest } from '../middleware/validator.js';
import {
  addressAnalysisSchema,
  ethereumAddressSchema,
  bitcoinAddressSchema
} from '../middleware/validator.js';
import { blockchainRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply blockchain-specific rate limiting to all routes
router.use(blockchainRateLimiter);

// Analyze address (comprehensive analysis)
router.post('/analyze', validateRequest(addressAnalysisSchema), analyzeAddress);

// Ethereum specific routes
router.post('/ethereum/address', validateRequest(ethereumAddressSchema), getEthereumAddress);
router.post('/ethereum/transactions', validateRequest(ethereumAddressSchema), getEthereumTransactions);
router.post('/ethereum/contract', validateRequest(ethereumAddressSchema), getContractInfo);
router.post('/ethereum/token-balance', getTokenBalance);

// Bitcoin specific routes
router.post('/bitcoin/address', validateRequest(bitcoinAddressSchema), getBitcoinAddress);
router.post('/bitcoin/transactions', validateRequest(bitcoinAddressSchema), getBitcoinTransactions);

// Risk assessment
router.post('/risk-assessment', validateRequest(addressAnalysisSchema), assessRisk);

export default router;
