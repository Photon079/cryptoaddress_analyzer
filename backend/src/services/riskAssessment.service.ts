import logger from '../utils/logger.js';
import etherscanService, { EthereumAddressData } from './etherscan.service.js';
import blockcypherService, { BitcoinAddressData } from './blockcypher.service.js';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskAssessment {
  address: string;
  blockchain: 'ethereum' | 'bitcoin';
  riskScore: number;
  riskLevel: RiskLevel;
  factors: string[];
  lastUpdated: string;
  details: {
    ageScore: number;
    transactionScore: number;
    balanceScore: number;
    contractScore?: number;
    activityScore: number;
  };
}

class RiskAssessmentService {
  private readonly RISK_WEIGHTS = {
    age: 0.25,
    transactions: 0.25,
    balance: 0.20,
    contract: 0.15,
    activity: 0.15
  };

  private calculateAgeScore(firstSeen: string | null): { score: number; factor: string | null } {
    if (!firstSeen) {
      return { score: 50, factor: 'Unknown address age' };
    }

    const ageInDays = Math.floor((Date.now() - new Date(firstSeen).getTime()) / (1000 * 60 * 60 * 24));

    if (ageInDays < 7) {
      return { score: 80, factor: 'Very new address (< 7 days)' };
    } else if (ageInDays < 30) {
      return { score: 60, factor: 'New address (< 30 days)' };
    } else if (ageInDays < 90) {
      return { score: 40, factor: 'Relatively new address (< 90 days)' };
    } else if (ageInDays < 365) {
      return { score: 20, factor: 'Moderate age address (< 1 year)' };
    } else {
      return { score: 0, factor: null };
    }
  }

  private calculateTransactionScore(txCount: number): { score: number; factor: string | null } {
    if (txCount === 0) {
      return { score: 70, factor: 'No transaction history' };
    } else if (txCount < 5) {
      return { score: 50, factor: 'Very low transaction count' };
    } else if (txCount > 10000) {
      return { score: 60, factor: 'Extremely high transaction volume' };
    } else if (txCount > 1000) {
      return { score: 40, factor: 'High transaction volume' };
    } else {
      return { score: 0, factor: null };
    }
  }

  private calculateEthBalanceScore(balanceEth: string): { score: number; factor: string | null } {
    const balance = parseFloat(balanceEth);

    if (balance === 0) {
      return { score: 30, factor: 'Zero balance' };
    } else if (balance > 1000) {
      return { score: 70, factor: 'Extremely high ETH balance (>1000 ETH)' };
    } else if (balance > 100) {
      return { score: 50, factor: 'Very high ETH balance (>100 ETH)' };
    } else if (balance > 10) {
      return { score: 30, factor: 'High ETH balance (>10 ETH)' };
    } else {
      return { score: 0, factor: null };
    }
  }

  private calculateBtcBalanceScore(balanceBtc: string): { score: number; factor: string | null } {
    const balance = parseFloat(balanceBtc);

    if (balance === 0) {
      return { score: 30, factor: 'Zero balance' };
    } else if (balance > 100) {
      return { score: 70, factor: 'Extremely high BTC balance (>100 BTC)' };
    } else if (balance > 10) {
      return { score: 50, factor: 'Very high BTC balance (>10 BTC)' };
    } else if (balance > 1) {
      return { score: 30, factor: 'High BTC balance (>1 BTC)' };
    } else {
      return { score: 0, factor: null };
    }
  }

  private calculateContractScore(isContract: boolean): { score: number; factor: string | null } {
    if (isContract) {
      return { score: 60, factor: 'Smart contract address' };
    }
    return { score: 0, factor: null };
  }

  private getRiskLevel(score: number): RiskLevel {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  }

  async assessEthereumAddress(address: string): Promise<RiskAssessment> {
    try {
      const addressData = await etherscanService.getAddressData(address);
      
      const ageResult = this.calculateAgeScore(addressData.firstSeen);
      const txResult = this.calculateTransactionScore(addressData.transactionCount);
      const balanceResult = this.calculateEthBalanceScore(addressData.balanceEth);
      const contractResult = this.calculateContractScore(addressData.isContract);

      const riskScore = Math.min(
        100,
        Math.round(
          ageResult.score * this.RISK_WEIGHTS.age +
          txResult.score * this.RISK_WEIGHTS.transactions +
          balanceResult.score * this.RISK_WEIGHTS.balance +
          contractResult.score * this.RISK_WEIGHTS.contract
        )
      );

      const factors = [
        ageResult.factor,
        txResult.factor,
        balanceResult.factor,
        contractResult.factor
      ].filter((f): f is string => f !== null);

      return {
        address,
        blockchain: 'ethereum',
        riskScore,
        riskLevel: this.getRiskLevel(riskScore),
        factors,
        lastUpdated: new Date().toISOString(),
        details: {
          ageScore: ageResult.score,
          transactionScore: txResult.score,
          balanceScore: balanceResult.score,
          contractScore: contractResult.score,
          activityScore: 0
        }
      };
    } catch (error) {
      logger.error(`Error assessing Ethereum address: ${error}`);
      throw error;
    }
  }

  async assessBitcoinAddress(address: string): Promise<RiskAssessment> {
    try {
      const addressData = await blockcypherService.getAddressData(address);
      
      const ageResult = this.calculateAgeScore(addressData.firstSeen);
      const txResult = this.calculateTransactionScore(addressData.transactionCount);
      const balanceResult = this.calculateBtcBalanceScore(addressData.balanceBtc);

      const riskScore = Math.min(
        100,
        Math.round(
          ageResult.score * 0.3 +
          txResult.score * 0.3 +
          balanceResult.score * 0.4
        )
      );

      const factors = [
        ageResult.factor,
        txResult.factor,
        balanceResult.factor
      ].filter((f): f is string => f !== null);

      return {
        address,
        blockchain: 'bitcoin',
        riskScore,
        riskLevel: this.getRiskLevel(riskScore),
        factors,
        lastUpdated: new Date().toISOString(),
        details: {
          ageScore: ageResult.score,
          transactionScore: txResult.score,
          balanceScore: balanceResult.score,
          activityScore: 0
        }
      };
    } catch (error) {
      logger.error(`Error assessing Bitcoin address: ${error}`);
      throw error;
    }
  }

  async assessAddress(address: string, blockchain: 'ethereum' | 'bitcoin'): Promise<RiskAssessment> {
    if (blockchain === 'ethereum') {
      return this.assessEthereumAddress(address);
    } else {
      return this.assessBitcoinAddress(address);
    }
  }
}

export default new RiskAssessmentService();
