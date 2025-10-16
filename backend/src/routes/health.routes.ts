import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import config from '../config/index.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const healthCheck = {
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    services: {
      etherscan: !!config.etherscanApiKey,
      blockcypher: !!config.blockcypherToken,
      appwrite: !!config.appwrite.apiKey
    },
    memory: {
      used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
      total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
      unit: 'MB'
    }
  };

  res.json(healthCheck);
}));

router.get('/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

export default router;
