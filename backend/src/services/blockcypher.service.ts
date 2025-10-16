import axios from 'axios';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

export interface BitcoinAddressData {
  address: string;
  balance: number;
  balanceBtc: string;
  totalReceived: number;
  totalSent: number;
  transactionCount: number;
  firstSeen: string | null;
  lastSeen: string;
  unconfirmedBalance: number;
}

export interface BitcoinTransaction {
  hash: string;
  confirmed: Date | null;
  received: Date;
  total: number;
  fees: number;
  inputs: Array<{
    addresses: string[];
    value: number;
  }>;
  outputs: Array<{
    addresses: string[];
    value: number;
  }>;
}

class BlockCypherService {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = config.apis.blockcypher;
    this.token = config.blockcypherToken;
  }

  private getUrl(endpoint: string): string {
    const url = `${this.baseUrl}/btc/main/${endpoint}`;
    return this.token ? `${url}?token=${this.token}` : url;
  }

  private async makeRequest(endpoint: string) {
    try {
      const response = await axios.get(this.getUrl(endpoint));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new AppError('Bitcoin address not found', 404);
        }
        logger.error(`BlockCypher API error: ${error.message}`);
        throw new AppError('Failed to fetch data from BlockCypher', 500);
      }
      throw error;
    }
  }

  async getAddressData(address: string): Promise<BitcoinAddressData> {
    try {
      const data = await this.makeRequest(`addrs/${address}/balance`);

      // Convert satoshis to BTC
      const balanceBtc = (data.balance / 1e8).toFixed(8);

      return {
        address: data.address,
        balance: data.balance || 0,
        balanceBtc,
        totalReceived: data.total_received || 0,
        totalSent: data.total_sent || 0,
        transactionCount: data.n_tx || 0,
        unconfirmedBalance: data.unconfirmed_balance || 0,
        firstSeen: null, // BlockCypher doesn't provide this directly
        lastSeen: new Date().toISOString()
      };
    } catch (error) {
      logger.error(`Error fetching Bitcoin address data: ${error}`);
      throw error;
    }
  }

  async getAddressWithTransactions(address: string, limit: number = 10): Promise<any> {
    try {
      const endpoint = `addrs/${address}/full?limit=${limit}`;
      const data = await this.makeRequest(endpoint);

      return {
        address: data.address,
        balance: data.balance || 0,
        balanceBtc: ((data.balance || 0) / 1e8).toFixed(8),
        totalReceived: data.total_received || 0,
        totalSent: data.total_sent || 0,
        transactionCount: data.n_tx || 0,
        unconfirmedBalance: data.unconfirmed_balance || 0,
        transactions: (data.txs || []).map((tx: any) => ({
          hash: tx.hash,
          confirmed: tx.confirmed ? new Date(tx.confirmed) : null,
          received: new Date(tx.received),
          total: tx.total,
          fees: tx.fees,
          inputs: tx.inputs.map((input: any) => ({
            addresses: input.addresses || [],
            value: input.output_value
          })),
          outputs: tx.outputs.map((output: any) => ({
            addresses: output.addresses || [],
            value: output.value
          }))
        }))
      };
    } catch (error) {
      logger.error(`Error fetching Bitcoin transactions: ${error}`);
      throw error;
    }
  }

  async getTransaction(txHash: string): Promise<any> {
    try {
      const data = await this.makeRequest(`txs/${txHash}`);

      return {
        hash: data.hash,
        blockHeight: data.block_height,
        blockHash: data.block_hash,
        confirmed: data.confirmed ? new Date(data.confirmed) : null,
        received: new Date(data.received),
        total: data.total,
        fees: data.fees,
        inputs: data.inputs.map((input: any) => ({
          addresses: input.addresses || [],
          value: input.output_value
        })),
        outputs: data.outputs.map((output: any) => ({
          addresses: output.addresses || [],
          value: output.value
        })),
        confirmations: data.confirmations
      };
    } catch (error) {
      logger.error(`Error fetching transaction: ${error}`);
      throw error;
    }
  }

  async getAddressTransactions(address: string, limit: number = 50): Promise<string[]> {
    try {
      const data = await this.makeRequest(`addrs/${address}?limit=${limit}`);
      return data.txrefs?.map((tx: any) => tx.tx_hash) || [];
    } catch (error) {
      logger.error(`Error fetching address transactions: ${error}`);
      throw error;
    }
  }

  async validateAddress(address: string): Promise<boolean> {
    try {
      await this.makeRequest(`addrs/${address}/balance`);
      return true;
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        return false;
      }
      throw error;
    }
  }
}

export default new BlockCypherService();
