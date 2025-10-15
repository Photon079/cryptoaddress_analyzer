import { useState } from 'react';
import { MagnifyingGlassIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const AddressSearchPage = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      toast.error('Please enter a valid address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      setSearchResults({
        address,
        balance: '2.45 ETH',
        usdValue: '$4,320.50',
        riskScore: 32,
        riskLevel: 'Low',
        firstSeen: '2022-05-15',
        transactions: 42,
        tags: ['Exchange', 'DeFi User'],
        riskFactors: [
          { type: 'Phishing', count: 2 },
          { type: 'Scam', count: 1 },
        ],
        recentTransactions: [
          { hash: '0x123...4567', value: '1.2 ETH', time: '2 hours ago', status: 'Completed' },
          { hash: '0x890...1234', value: '0.5 ETH', time: '5 hours ago', status: 'Completed' },
        ],
      });
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search address');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-800';
    if (score < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-semibold leading-6 text-text-primary">
          Search Crypto Address
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-text-secondary">
          Enter a cryptocurrency address to analyze its risk profile and transaction history.
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="address" className="sr-only">
              Crypto Address
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="address"
                id="address"
                className="block w-full rounded-md border-0 py-3 pl-10 text-text-primary bg-primary ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                placeholder="Enter Ethereum, Bitcoin, or other crypto address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="-ml-1 mr-2 h-4 w-4" />
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {searchResults && (
        <div className="mt-8 bg-primary-dark rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-text-primary">
                  {searchResults.address}
                </h3>
                <div className="mt-1 flex items-center">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskColor(searchResults.riskScore)}`}>
                    {searchResults.riskLevel} Risk (Score: {searchResults.riskScore}/100)
                  </span>
                  <span className="ml-2 text-sm text-text-secondary">
                    First seen: {searchResults.firstSeen}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">Balance</p>
                <p className="text-lg font-medium text-text-primary">{searchResults.balance}</p>
                <p className="text-sm text-text-secondary">{searchResults.usdValue}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {['Overview', 'Transactions', 'Risk Analysis', 'Tags'].map((tab) => {
                const tabId = tab.toLowerCase().replace(' ', '-');
                const isActive = activeTab === tabId;
                return (
                  <button
                    key={tabId}
                    onClick={() => setActiveTab(tabId)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      isActive
                        ? 'border-accent text-accent'
                        : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-4">Risk Factors</h4>
                  <div className="space-y-3">
                    {searchResults.riskFactors.map((factor: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-primary rounded-lg">
                        <div className="flex items-center">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="text-sm font-medium text-text-primary">{factor.type}</span>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          {factor.count} incidents
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.tags.map((tag: string, index: number) => (
                      <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-primary">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text-primary sm:pl-6">
                        Transaction
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary">
                        Value
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary">
                        Time
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-primary">
                    {searchResults.recentTransactions.map((tx: any, index: number) => (
                      <tr key={index} className="hover:bg-primary-dark/50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-text-primary sm:pl-6">
                          {tx.hash}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-text-primary">
                          {tx.value}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">
                          {tx.time}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'risk-analysis' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Risk Score</h4>
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        searchResults.riskScore < 30 
                          ? 'bg-green-500' 
                          : searchResults.riskScore < 70 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${searchResults.riskScore}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    This address has a {searchResults.riskLevel.toLowerCase()} risk score based on our analysis.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Risk Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm text-text-primary">Associated with known exchange</span>
                    </li>
                    <li className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm text-text-primary">High transaction volume</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'tags' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-2">Address Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.tags.map((tag: string, index: number) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-text-secondary mb-2 mt-4">Add New Tag</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 bg-primary"
                      placeholder="Enter a tag"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSearchPage;
