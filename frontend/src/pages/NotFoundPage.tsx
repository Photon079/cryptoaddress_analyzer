import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-accent/10">
            <span className="text-6xl font-bold text-accent">404</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Page Not Found
        </h1>

        <p className="text-lg text-text-secondary mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full rounded-md bg-accent px-4 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Go back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 bg-primary px-4 py-3 text-sm font-semibold text-text-primary shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Go back
          </button>
        </div>

        <div className="mt-8 text-sm text-text-secondary">
          <p>If you think this is a mistake, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
