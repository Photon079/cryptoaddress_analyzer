// Blockchain API services for cryptocurrency address analysis

// Types for blockchain data
export interface EthereumAddressData {
  address: string;
  balance: string;
  transactionCount: number;
  firstSeen: string;
  lastSeen: string;
  contractCreation?: string;
  isContract: boolean;
}

export interface BitcoinAddressData {
  address: string;
  balance: number;
  totalReceived: number;
  totalSent: number;
  transactionCount: number;
  firstSeen: string;
  lastSeen: string;
}

export interface RiskAssessment {
  address: string;
  blockchain: 'ethereum' | 'bitcoin';
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  lastUpdated: string;
}

// Etherscan API Service
export const etherscanService = {
  async getEthereumAddressData(address: string): Promise<EthereumAddressData> {
    try {
      const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;
      if (!apiKey) {
        throw new Error('Etherscan API key not configured');
      }

      // Get basic address info
      const balanceResponse = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
      );
      const balanceData = await balanceResponse.json();

      if (balanceData.status !== '1') {
        throw new Error(balanceData.message || 'Failed to fetch balance');
      }

      // Get transaction count
      const txCountResponse = await fetch(
        `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${apiKey}`
      );
      const txCountData = await txCountResponse.json();

      // Get first transaction (approximate first seen date)
      const txListResponse = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${apiKey}`
      );
      const txListData = await txListResponse.json();

      let firstSeen = new Date().toISOString();
      if (txListData.result && txListData.result.length > 0) {
        firstSeen = new Date(parseInt(txListData.result[0].timeStamp) * 1000).toISOString();
      }

      return {
        address,
        balance: balanceData.result,
        transactionCount: parseInt(txCountData.result || '0', 16),
        firstSeen,
        lastSeen: new Date().toISOString(),
        isContract: false, // Would need additional API calls to determine
      };
    } catch (error) {
      console.error('Etherscan API error:', error);
      throw error;
    }
  },

  async getContractInfo(address: string): Promise<{ isContract: boolean; creationDate?: string }> {
    try {
      const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;
      if (!apiKey) {
        throw new Error('Etherscan API key not configured');
      }

      const response = await fetch(
        `https://api.etherscan.io/api?module=proxy&action=eth_getCode&address=${address}&tag=latest&apikey=${apiKey}`
      );
      const data = await response.json();

      const isContract = data.result && data.result !== '0x';

      if (isContract) {
        // Get contract creation transaction
        const txResponse = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${apiKey}`
        );
        const txData = await txResponse.json();

        let creationDate: string | undefined;
        if (txData.result && txData.result.length > 0) {
          creationDate = new Date(parseInt(txData.result[0].timeStamp) * 1000).toISOString();
        }

        return { isContract: true, creationDate };
      }

      return { isContract: false };
    } catch (error) {
      console.error('Contract info error:', error);
      return { isContract: false };
    }
  },
};

// BlockCypher API Service
export const blockcypherService = {
  async getBitcoinAddressData(address: string): Promise<BitcoinAddressData> {
    try {
      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/main/addrs/${address}`
      );
      const data = await response.json();

      if (response.status === 404) {
        throw new Error('Address not found');
      }

      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${data.error || 'Unknown error'}`);
      }

      return {
        address,
        balance: data.balance || 0,
        totalReceived: data.total_received || 0,
        totalSent: data.total_sent || 0,
        transactionCount: data.n_tx || 0,
        firstSeen: new Date().toISOString(), // BlockCypher doesn't provide this directly
        lastSeen: new Date().toISOString(),
      };
    } catch (error) {
      console.error('BlockCypher API error:', error);
      throw error;
    }
  },

  async getAddressTransactions(address: string, limit: number = 10) {
    try {
      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?limit=${limit}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`BlockCypher API error: ${data.error || 'Unknown error'}`);
      }

      return data.txs || [];
    } catch (error) {
      console.error('BlockCypher transactions error:', error);
      throw error;
    }
  },
};

// Risk Assessment Service
export const riskAssessmentService = {
  calculateRiskScore(addressData: EthereumAddressData | BitcoinAddressData): RiskAssessment {
    let riskScore = 0;
    const factors: string[] = [];

    // Age factor (newer addresses are riskier)
    const ageInDays = Math.floor((Date.now() - new Date(addressData.firstSeen).getTime()) / (1000 * 60 * 60 * 24));

    if (ageInDays < 30) {
      riskScore += 30;
      factors.push('Very new address (< 30 days)');
    } else if (ageInDays < 90) {
      riskScore += 15;
      factors.push('New address (< 90 days)');
    }

    // Transaction volume factor
    if ('transactionCount' in addressData && addressData.transactionCount > 1000) {
      riskScore += 20;
      factors.push('High transaction volume');
    }

    // Balance factor (very high balances might be suspicious)
    if ('balance' in addressData) {
      const balance = parseFloat(addressData.balance);
      if (balance > 100) { // High ETH balance
        riskScore += 15;
        factors.push('High balance');
      }
    }

    // Contract factor (contracts can be riskier)
    if ('isContract' in addressData && addressData.isContract) {
      riskScore += 25;
      factors.push('Contract address');
    }

    // Cap at 100
    riskScore = Math.min(riskScore, 100);

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (riskScore >= 80) riskLevel = 'critical';
    else if (riskScore >= 60) riskLevel = 'high';
    else if (riskScore >= 30) riskLevel = 'medium';

    return {
      address: addressData.address,
      blockchain: 'isContract' in addressData ? 'ethereum' : 'bitcoin',
      riskScore,
      riskLevel,
      factors,
      lastUpdated: new Date().toISOString(),
    };
  },

  async assessAddress(address: string, blockchain: 'ethereum' | 'bitcoin'): Promise<RiskAssessment> {
    try {
      let addressData;

      if (blockchain === 'ethereum') {
        addressData = await etherscanService.getEthereumAddressData(address);
        const contractInfo = await etherscanService.getContractInfo(address);
        addressData.isContract = contractInfo.isContract;
        if (contractInfo.creationDate) {
          addressData.firstSeen = contractInfo.creationDate;
        }
      } else {
        addressData = await blockcypherService.getBitcoinAddressData(address);
      }

      return this.calculateRiskScore(addressData);
    } catch (error) {
      console.error('Risk assessment error:', error);
      throw error;
    }
  },
};
