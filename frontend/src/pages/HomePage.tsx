import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MagnifyingGlassIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Address Search',
    description: 'Search for any cryptocurrency address to get detailed risk assessment and transaction history.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Risk Analysis',
    description: 'Get comprehensive risk scores based on transaction patterns and known threat intelligence.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Advanced Analytics',
    description: 'Visualize transaction flows and network connections with our powerful analytics tools.',
    icon: ChartBarIcon,
  },
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Cryptocurrency Address</span>{' '}
                  <span className="block text-accent xl:inline">Intelligence Platform</span>
                </h1>
                <p className="mt-3 text-base text-text-secondary sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Analyze and monitor cryptocurrency addresses for risk assessment, transaction history, and threat intelligence.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to={isAuthenticated ? "/dashboard" : "/search"}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-8 py-3 text-base font-medium text-primary hover:bg-accent-dark md:py-4 md:px-10 md:text-lg"
                    >
                      {isAuthenticated ? 'Go to Dashboard' : 'Search an Address'}
                    </Link>
                  </div>
                  {!isAuthenticated && (
                    <div className="mt-3 sm:ml-3 sm:mt-0">
                      <Link
                        to="/register"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-accent/10 px-8 py-3 text-base font-medium text-accent hover:bg-accent/20 md:py-4 md:px-10 md:text-lg"
                      >
                        Sign up for free
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-primary-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-lg font-semibold text-accent">Features</h2>
            <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-text-primary sm:text-4xl">
              Better way to analyze crypto addresses
            </p>
            <p className="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
              Our platform provides comprehensive tools to help you understand and assess cryptocurrency addresses.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-accent text-primary">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-text-primary">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-text-secondary">{feature.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-dark">Start analyzing addresses today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to={isAuthenticated ? "/search" : "/register"}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-5 py-3 text-base font-medium text-accent hover:bg-primary/90"
              >
                {isAuthenticated ? 'Search Addresses' : 'Get started'}
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-accent/10 px-5 py-3 text-base font-medium text-primary hover:bg-accent/20"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
