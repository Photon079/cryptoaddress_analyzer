import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChartBarIcon, MagnifyingGlassIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

// Mock data for the dashboard
const recentSearches = [
  { id: 1, address: '0x***...***4e', risk: 'High', date: 'Today' },
  { id: 2, address: '0x***...***84', risk: 'Medium', date: 'Yesterday' },
  { id: 3, address: '0x***...***8D', risk: 'Low', date: '2 days ago' },
];

const stats = [
  { name: 'Your Recent Searches', value: '12', change: '+3 this week', changeType: 'increase' },
  { name: 'Risk Alerts', value: '3', change: '-2 this week', changeType: 'decrease' },
  { name: 'Saved Addresses', value: '8', change: '+1 this week', changeType: 'increase' },
  { name: 'Analysis Time', value: '< 2s', change: 'avg response', changeType: 'none' },
];

const DashboardPage = () => {
  const { user } = useAuth();

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-semibold leading-6 text-text-primary">
          Welcome back, {user?.name || 'User'}
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-text-secondary">
          Here's what's happening with your account and monitored addresses.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-primary-dark px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-text-secondary">{stat.name}</p>
            </dt>
            <dd className="flex items-baseline">
              <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : stat.changeType === 'decrease' ? (
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 011.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
                <span className="sr-only">
                  {stat.changeType === 'increase' ? 'Increased' : stat.changeType === 'decrease' ? 'Decreased' : 'No change'} by
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-lg font-medium leading-6 text-text-primary">Recent Searches</h2>
            <p className="mt-2 text-sm text-text-secondary">
              A list of your most recent address searches and their risk assessments.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="/search"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 sm:w-auto"
            >
              New Search
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-primary-dark">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text-primary sm:pl-6"
                      >
                        Address
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary">
                        Risk Level
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary">
                        Date
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-primary">
                    {recentSearches.map((search) => (
                      <tr key={search.id} className="hover:bg-primary-dark/50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-text-primary sm:pl-6">
                          {search.address}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskColor(
                              search.risk
                            )}`}
                          >
                            {search.risk} Risk
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">
                          <div className="flex items-center">
                            <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {search.date}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href={`/search?address=${search.address}`} className="text-accent hover:text-accent-dark">
                            View<span className="sr-only">, {search.address}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-text-primary mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-primary px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-gray-400">
            <div className="flex-shrink-0 rounded-md bg-accent/10 p-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <Link to="/search" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-text-primary">Search Address</p>
                <p className="truncate text-sm text-text-secondary">Look up a new crypto address</p>
              </Link>
            </div>
          </div>

          <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-primary px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-gray-400">
            <div className="flex-shrink-0 rounded-md bg-purple-500/10 p-2">
              <ShieldCheckIcon className="h-6 w-6 text-purple-500" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-text-primary">Risk Reports</p>
                <p className="truncate text-sm text-text-secondary">View detailed risk reports</p>
              </a>
            </div>
          </div>

          <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-primary px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-gray-400">
            <div className="flex-shrink-0 rounded-md bg-blue-500/10 p-2">
              <ChartBarIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-text-primary">Analytics</p>
                <p className="truncate text-sm text-text-secondary">View analytics dashboard</p>
              </a>
            </div>
          </div>

          <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-primary px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-gray-400">
            <div className="flex-shrink-0 rounded-md bg-green-500/10 p-2">
              <svg
                className="h-6 w-6 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-text-primary">Activity Log</p>
                <p className="truncate text-sm text-text-secondary">View your activity history</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
