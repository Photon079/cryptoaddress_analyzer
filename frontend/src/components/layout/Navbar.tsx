import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-primary-dark shadow-sm">
      <nav className="flex items-center justify-between p-4" aria-label="Global">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="./logo.jpg" alt="Blocktrace Logo" className="h-10 w-10 rounded-md object-cover" />
            <span className="text-xl font-bold text-text-primary">Blocktrace</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-text-primary hover:text-accent">
            Home
          </Link>
          <Link to="/search" className="text-sm font-semibold leading-6 text-text-primary hover:text-accent">
            Search Addresses
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-sm font-semibold leading-6 text-text-primary hover:text-accent">
              Dashboard
            </Link>
          )}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-text-primary">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-text-primary hover:text-accent"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold leading-6 text-text-primary hover:text-accent">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-primary px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.jpg" alt="Blocktrace Logo" className="h-10 w-10 rounded-md object-cover" />
                <span className="text-xl font-bold text-text-primary">Blocktrace</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-4 py-6">
                <Link 
                  to="/" 
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text-primary hover:bg-accent/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/search" 
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text-primary hover:bg-accent/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search Addresses
                </Link>
                {isAuthenticated && (
                  <Link 
                    to="/dashboard" 
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text-primary hover:bg-accent/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-text-primary hover:bg-accent/10"
                  >
                    Log out
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text-primary hover:bg-accent/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
