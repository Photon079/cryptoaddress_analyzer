import axios from 'axios';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

export interface EthereumAddressData {
  address: string;
  balance: string;
  balanceEth: string;
  transactionCount: number;
  firstSeen: string | null;
  lastSeen: string;
  isContract: boolean;
  contractCreation?: string;
}

export interface EthereumTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  blockNumber: string;
  gasUsed: string;
  gasPrice: string;
}

class EtherscanService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.etherscanApiKey;
    this.baseUrl = config.apis.etherscan;
  }

  private async makeRequest(params: Record<string, string>) {
    try {
      const queryParams = new URLSearchParams({
        ...params,
        apikey: this.apiKey
      });

      const response = await axios.get(`${this.baseUrl}?${queryParams}`);
      
      if (response.data.status === '0' && response.data.message !== 'No transactions found') {
        throw new AppError(response.data.result || 'Etherscan API error', 400);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(`Etherscan API error: ${error.message}`);
        throw new AppError('Failed to fetch data from Etherscan', 500);
      }
      throw error;
    }
  }

  async getAddressBalance(address: string): Promise<string> {
    const data = await this.makeRequest({
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest'
    });

    return data.result;
  }

  async getTransactionCount(address: string): Promise<number> {
    const data = await this.makeRequest({
      module: 'proxy',
      action: 'eth_getTransactionCount',
      address,
      tag: 'latest'
    });

    return parseInt(data.result, 16);
  }

  async getTransactions(address: string, limit: number = 10): Promise<EthereumTransaction[]> {
    const data = await this.makeRequest({
      module: 'account',
      action: 'txlist',
      address,
      startblock: '0',
      endblock: '99999999',
      page: '1',
      offset: limit.toString(),
      sort: 'desc'
    });

    if (!data.result || data.result.length === 0) {
      return [];
    }

    return data.result.map((tx: any) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
      blockNumber: tx.blockNumber,
      gasUsed: tx.gasUsed,
      gasPrice: tx.gasPrice
    }));
  }

  async isContractAddress(address: string): Promise<boolean> {
    const data = await this.makeRequest({
      module: 'proxy',
      action: 'eth_getCode',
      address,
      tag: 'latest'
    });

    return data.result && data.result !== '0x';
  }

  async getAddressData(address: string): Promise<EthereumAddressData> {
    try {
      // Parallel requests for better performance
      const [balance, txCount, isContract, transactions] = await Promise.all([
        this.getAddressBalance(address),
        this.getTransactionCount(address),
        this.isContractAddress(address),
        this.getTransactions(address, 1)
      ]);

      // Convert Wei to ETH
      const balanceEth = (parseInt(balance) / 1e18).toFixed(6);

      // Get first transaction timestamp
      let firstSeen: string | null = null;
      if (transactions.length > 0) {
        const firstTxData = await this.makeRequest({
          module: 'account',
          action: 'txlist',
          address,
          startblock: '0',
          endblock: '99999999',
          page: '1',
          offset: '1',
          sort: 'asc'
        });

        if (firstTxData.result && firstTxData.result.length > 0) {
          firstSeen = new Date(parseInt(firstTxData.result[0].timeStamp) * 1000).toISOString();
        }
      }

      return {
        address,
        balance,
        balanceEth,
        transactionCount: txCount,
        firstSeen,
        lastSeen: new Date().toISOString(),
        isContract,
      };
    } catch (error) {
      logger.error(`Error fetching Ethereum address data: ${error}`);
      throw error;
    }
  }

  async getContractInfo(address: string) {
    try {
      const isContract = await this.isContractAddress(address);
      
      if (!isContract) {
        return { isContract: false };
      }

      const data = await this.makeRequest({
        module: 'contract',
        action: 'getcontractcreation',
        contractaddresses: address
      });

      return {
        isContract: true,
        creator: data.result?.[0]?.contractCreator,
        txHash: data.result?.[0]?.txHash
      };
    } catch (error) {
      logger.error(`Error fetching contract info: ${error}`);
      return { isContract: false };
    }
  }

  async getTokenBalance(address: string, contractAddress: string): Promise<string> {
    const data = await this.makeRequest({
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address,
      tag: 'latest'
    });

    return data.result;
  }
}

export default new EtherscanService();
