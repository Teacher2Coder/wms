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
  Settings, 
  Plus,
  Edit3,
  Trash2,
  Eye,
  Building2,
  Layers3,
  Box,
  ClipboardList,
  Shield,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import auth from '../utils/auth/auth.js';

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

  const managementCards = [
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
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Management Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {managementCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={card.action || (() => {
                      if (card.link) {
                        window.location.href = card.link;
                      }
                    })}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${card.color}`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{card.count}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {action.link ? (
                        <Link
                          to={action.link}
                          className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                        >
                          <div className={`p-2 rounded-lg ${action.color} w-fit mb-3`}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </Link>
                      ) : (
                        <button
                          onClick={action.action}
                          className="w-full text-left bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                        >
                          <div className={`p-2 rounded-lg ${action.color} w-fit mb-3`}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: 'User registered', user: 'john.doe', time: '2 hours ago', type: 'user' },
                    { action: 'Product added', user: 'jane.smith', time: '4 hours ago', type: 'product' },
                    { action: 'Warehouse updated', user: 'mike.johnson', time: '6 hours ago', type: 'warehouse' },
                    { action: 'Order processed', user: 'sarah.wilson', time: '8 hours ago', type: 'order' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-100' :
                        activity.type === 'product' ? 'bg-purple-100' :
                        activity.type === 'warehouse' ? 'bg-green-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'product' && <Package className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'warehouse' && <Warehouse className="h-4 w-4 text-green-600" />}
                        {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                    <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
                  </div>
                  <Link
                    to="/register"
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-indigo-700">
                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">@{user.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              {user?.role === 'Admin' ? (
                                <button className="text-green-600 hover:text-green-900">
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              ) : (
                                <>
                                  <button className="text-green-600 hover:text-green-900">
                                    <Edit3 className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Users</p>
                        <p className="text-3xl font-bold">{stats.totalUsers}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Active Warehouses</p>
                        <p className="text-3xl font-bold">{stats.totalWarehouses}</p>
                      </div>
                      <Warehouse className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Total Products</p>
                        <p className="text-3xl font-bold">{stats.totalProducts}</p>
                      </div>
                      <Package className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Detailed analytics charts would be implemented here</p>
                  <p className="text-sm">Integration with your data visualization library</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Manage;
