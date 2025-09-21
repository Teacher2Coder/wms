import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  BarChart3, 
  Building2,
  Box,
  Shield,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import auth from '../utils/auth/auth.js';
import Analytics from '../components/admin/Analytics.jsx';
import UserManagement from '../components/admin/UserManagement.jsx';
import Overview from '../components/admin/Overview.jsx';
import handleSmoothScroll from '../utils/handleSmoothScroll';

const Manage = () => {
  const { user, canManage } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalWarehouses: 0,
    totalProducts: 0,
    totalOrders: 0
  });

  const actions = [
    { action: 'User registered', user: 'john.doe', time: '2 hours ago', type: 'user' },
    { action: 'Product added', user: 'jane.smith', time: '4 hours ago', type: 'product' },
    { action: 'Warehouse updated', user: 'mike.johnson', time: '6 hours ago', type: 'warehouse' },
    { action: 'Order processed', user: 'sarah.wilson', time: '8 hours ago', type: 'order' }
  ];

  // Redirect if user doesn't have management permissions
  if (!canManage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You need Manager or Admin privileges to access this page.
          </p>
          <Link
            to="/"
            onClick={() => handleSmoothScroll()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchUsers();
    // In a real app, you'd also fetch stats from your API
    setStats({
      totalUsers: 0,
      activeUsers: 0,
      totalWarehouses: 4,
      totalProducts: 25,
      totalOrders: 156
    });
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = await auth.getAllUsers();
      setUsers(userData);
      setStats(prev => ({
        ...prev,
        totalUsers: userData.length,
        activeUsers: userData.filter(u => u.isActive).length
      }));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async () => {
    try {
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await auth.deleteUser(userId);
        await fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const overviewCards = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      color: 'bg-blue-500',
      count: stats.totalUsers,
      action: () => setActiveTab('users')
    },
    {
      title: 'Warehouse Operations',
      description: 'Manage warehouses, sections, and inventory',
      icon: Warehouse,
      color: 'bg-green-500',
      count: stats.totalWarehouses,
      link: '/'
    },
    {
      title: 'Product Management',
      description: 'Add, edit, and organize product catalog',
      icon: Package,
      color: 'bg-purple-500',
      count: stats.totalProducts,
      link: '/products'
    },
    {
      title: 'Order Management',
      description: 'Process and track customer orders',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      count: stats.totalOrders,
      link: '/orders'
    }
  ];

  const quickActions = [
    {
      title: 'Register New User',
      description: 'Add a new team member',
      icon: UserPlus,
      color: 'bg-indigo-500',
      link: '/register'
    },
    {
      title: 'Create Warehouse',
      description: 'Add a new warehouse location',
      icon: Building2,
      color: 'bg-cyan-500',
      action: () => {/* Navigate to warehouse creation */}
    },
    {
      title: 'Add Product',
      description: 'Add new product to catalog',
      icon: Box,
      color: 'bg-pink-500',
      action: () => {/* Navigate to product creation */}
    },
    {
      title: 'View Reports',
      description: 'Access management reports',
      icon: BarChart3,
      color: 'bg-yellow-500',
      action: () => {/* Navigate to reports */}
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Management Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName}! Here's your management overview.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Shield className="h-4 w-4 mr-1" />
                {user?.role}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <nav className="flex space-x-8 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <Overview 
              overviewCards={overviewCards}
              quickActions={quickActions}
              stats={stats}
              actions={actions}
            />
          )}

          {activeTab === 'users' && (
            <UserManagement
              users={users}
              loading={loading}
              stats={stats}
              user={user}
              fetchUsers={fetchUsers}
              handleToggleUserStatus={handleToggleUserStatus}
              handleDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics stats={stats} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Manage;
