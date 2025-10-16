import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import etherscanService from '../services/etherscan.service.js';
import blockcypherService from '../services/blockcypher.service.js';
import riskAssessmentService from '../services/riskAssessment.service.js';
import logger from '../utils/logger.js';

export const analyzeAddress = asyncHandler(async (req: Request, res: Response) => {
  const { address, blockchain } = req.body;

  logger.info(`Analyzing ${blockchain} address: ${address}`);

  let addressData;
  let riskAssessment;

  if (blockchain === 'ethereum') {
    addressData = await etherscanService.getAddressData(address);
    riskAssessment = await riskAssessmentService.assessEthereumAddress(address);
  } else if (blockchain === 'bitcoin') {
    addressData = await blockcypherService.getAddressData(address);
    riskAssessment = await riskAssessmentService.assessBitcoinAddress(address);
  }

  res.json({
    success: true,
    data: {
      addressData,
      riskAssessment
    }
  });
});

export const getEthereumAddress = asyncHandler(async (req: Request, res: Response) => {
  const { address } = req.body;

  logger.info(`Fetching Ethereum address data: ${address}`);

  const addressData = await etherscanService.getAddressData(address);
  
  res.json({
    success: true,
    data: addressData
  });
});

export const getBitcoinAddress = asyncHandler(async (req: Request, res: Response) => {
  const { address } = req.body;

  logger.info(`Fetching Bitcoin address data: ${address}`);

  const addressData = await blockcypherService.getAddressData(address);
  
  res.json({
    success: true,
    data: addressData
  });
});

export const getEthereumTransactions = asyncHandler(async (req: Request, res: Response) => {
  const { address } = req.body;
  const limit = parseInt(req.query.limit as string) || 10;

  logger.info(`Fetching Ethereum transactions for: ${address}`);

  const transactions = await etherscanService.getTransactions(address, limit);
  
  res.json({
    success: true,
    data: {
      address,
      transactions,
      count: transactions.length
    }
  });
});

export const getBitcoinTransactions = asyncHandler(async (req: Request, res: Response) => {
  const { address } = req.body;
  const limit = parseInt(req.query.limit as string) || 10;

  logger.info(`Fetching Bitcoin transactions for: ${address}`);

  const data = await blockcypherService.getAddressWithTransactions(address, limit);
  
  res.json({
    success: true,
    data: {
      address: data.address,
      transactions: data.transactions,
      count: data.transactions.length
    }
  });
});

export const assessRisk = asyncHandler(async (req: Request, res: Response) => {
  const { address, blockchain } = req.body;

  logger.info(`Assessing risk for ${blockchain} address: ${address}`);

  const riskAssessment = await riskAssessmentService.assessAddress(address, blockchain);
  
  res.json({
    success: true,
    data: riskAssessment
  });
});

export const getContractInfo = asyncHandler(async (req: Request, res: Response) => {
  const { address } = req.body;

  logger.info(`Fetching contract info for: ${address}`);

  const contractInfo = await etherscanService.getContractInfo(address);
  
  res.json({
    success: true,
    data: contractInfo
  });
});

export const getTokenBalance = asyncHandler(async (req: Request, res: Response) => {
  const { address, contractAddress } = req.body;

  logger.info(`Fetching token balance for address: ${address}, contract: ${contractAddress}`);

  const balance = await etherscanService.getTokenBalance(address, contractAddress);
  
  res.json({
    success: true,
    data: {
      address,
      contractAddress,
      balance
    }
  });
});
