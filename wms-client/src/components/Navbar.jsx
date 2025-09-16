import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import handleSmoothScroll from '../utils/handleSmoothScroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated, canManage } = useAuth();

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Product Management', path: '/products' },
  ];

  // Don't render navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <motion.nav
      className='fixed top-0 w-full z-50 bg-primary-500 transition-all duration-300'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center ml-2 h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={() => handleSmoothScroll()}
          >
            <div className="p-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="/WMS.svg"
                alt="wms-client"
                className="w-6 h-6"
              />
            </div>
            <span className="font-bold text-xl text-white header-text">
              <span className="hidden sm:inline">Warehouse Management System</span>
              <span className="sm:hidden">WMS</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-gray-200 hover:text-white'
                }`}
                onClick={() => handleSmoothScroll()}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                    layoutId="activeTab"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{user?.firstName || user?.username}</span>
                  <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user?.username}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user?.role === 'Admin' ? 'bg-red-100 text-red-800' :
                            user?.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user?.role}
                          </span>
                        </p>
                      </div>
                      
                      {canManage && (
                        <Link
                          to="/register"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <UserPlus className="w-4 h-4 mr-3" />
                          Register New User
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && isAuthenticated && (
            <motion.div
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2 container-padding">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200 mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user?.username}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user?.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      user?.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user?.role}
                    </span>
                  </p>
                </div>

                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                        location.pathname === item.path
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleSmoothScroll()}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Actions */}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  {canManage && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                    >
                      <Link
                        to="/register"
                        className="flex items-center py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <UserPlus className="w-4 h-4 mr-3" />
                        Register New User
                      </Link>
                    </motion.div>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + 1) * 0.1 }}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full py-3 px-4 rounded-lg font-medium text-red-700 hover:bg-red-50 transition-colors duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
