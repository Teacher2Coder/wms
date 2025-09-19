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
  Shield,
  Edit3,
  Trash2,
  Eye,
  Building2,
  Box,
  Database,
  Activity,
  TrendingUp,
  Lock,
  Unlock,
  Crown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Server,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import auth from '../utils/auth/auth.js';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    apiStatus: 'online',
    dbStatus: 'online',
    lastBackup: new Date().toISOString()
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0,
    managerUsers: 0,
    employeeUsers: 0,
    totalWarehouses: 0,
    totalProducts: 0,
    totalOrders: 0,
    systemUptime: '99.9%'
  });

  // Redirect if user doesn't have admin permissions
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-600 mb-4">
            You need Administrator privileges to access this page.
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
    fetchSystemStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = await auth.getAllUsers();
      setUsers(userData);
      
      // Calculate user statistics
      const totalUsers = userData.length;
      const activeUsers = userData.filter(u => u.isActive).length;
      const inactiveUsers = totalUsers - activeUsers;
      const adminUsers = userData.filter(u => u.role === 'Admin').length;
      const managerUsers = userData.filter(u => u.role === 'Manager').length;
      const employeeUsers = userData.filter(u => u.role === 'Employee').length;
      
      setStats(prev => ({
        ...prev,
        totalUsers,
        activeUsers,
        inactiveUsers,
        adminUsers,
        managerUsers,
        employeeUsers
      }));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemStats = () => {
    // In a real app, you'd fetch these from your API
    setStats(prev => ({
      ...prev,
      totalWarehouses: 4,
      totalProducts: 25,
      totalOrders: 156,
      systemUptime: '99.9%'
    }));
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await auth.deleteUser(userId);
        await fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleToggleUserStatus = async () => {
    try {
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const adminCards = [
    {
      title: 'Total Users',
      description: 'All registered users in the system',
      icon: Users,
      color: 'bg-blue-500',
      count: stats.totalUsers,
      action: () => setActiveTab('users')
    },
    {
      title: 'System Health',
      description: 'Monitor system performance and status',
      icon: Activity,
      color: 'bg-green-500',
      count: stats.systemUptime,
      action: () => setActiveTab('system')
    },
    {
      title: 'Security Center',
      description: 'Manage security settings and permissions',
      icon: Shield,
      color: 'bg-red-500',
      count: stats.adminUsers,
      action: () => setActiveTab('security')
    },
    {
      title: 'Data Management',
      description: 'Backup, restore, and manage data',
      icon: Database,
      color: 'bg-purple-500',
      count: '24h',
      action: () => setActiveTab('data')
    }
  ];

  const quickActions = [
    {
      title: 'Create Admin User',
      description: 'Add a new administrator',
      icon: Crown,
      color: 'bg-red-500',
      link: '/register'
    },
    {
      title: 'System Backup',
      description: 'Create system backup',
      icon: Download,
      color: 'bg-blue-500',
      action: () => console.log('System backup initiated')
    },
    {
      title: 'View Audit Logs',
      description: 'Review system audit trail',
      icon: Eye,
      color: 'bg-yellow-500',
      action: () => console.log('View audit logs')
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: Settings,
      color: 'bg-gray-500',
      action: () => setActiveTab('system')
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Crown className="h-8 w-8 text-red-600 mr-3" />
                Administrator Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName}! You have full system control.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <Crown className="h-4 w-4 mr-1" />
                Administrator
              </span>
              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                systemStatus.apiStatus === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  systemStatus.apiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                System {systemStatus.apiStatus}
              </div>
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
          <nav className="flex space-x-8 bg-white rounded-lg p-1 shadow-sm border border-gray-200 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'system', label: 'System Health', icon: Server },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'data', label: 'Data Management', icon: Database },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-red-100 text-red-700'
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
              {/* Admin Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={card.action}
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Administrative Actions</h2>
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

              {/* System Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">API Server</p>
                      <p className="text-sm text-green-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Database</p>
                      <p className="text-sm text-green-600">Connected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Globe className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Uptime</p>
                      <p className="text-sm text-blue-600">{stats.systemUptime}</p>
                    </div>
                  </div>
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
                    <h2 className="text-xl font-semibold text-gray-900">Advanced User Management</h2>
                    <p className="text-gray-600 mt-1">Full administrative control over user accounts</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={fetchUsers}
                      className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </button>
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Link>
                  </div>
                </div>
              </div>

              {/* User Statistics */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.inactiveUsers}</div>
                    <div className="text-sm text-gray-600">Inactive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.adminUsers}</div>
                    <div className="text-sm text-gray-600">Admins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.managerUsers}</div>
                    <div className="text-sm text-gray-600">Managers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.employeeUsers}</div>
                    <div className="text-sm text-gray-600">Employees</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
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
                            Last Login
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((userData) => (
                          <tr key={userData.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                  userData.role === 'Admin' ? 'bg-red-100' :
                                  userData.role === 'Manager' ? 'bg-blue-100' :
                                  'bg-green-100'
                                }`}>
                                  <span className={`text-sm font-medium ${
                                    userData.role === 'Admin' ? 'text-red-700' :
                                    userData.role === 'Manager' ? 'text-blue-700' :
                                    'text-green-700'
                                  }`}>
                                    {userData.firstName?.[0]}{userData.lastName?.[0]}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {userData.firstName} {userData.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">@{userData.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                userData.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                userData.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {userData.role === 'Admin' && <Crown className="h-3 w-3 mr-1" />}
                                {userData.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                userData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {userData.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(userData.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {userData.lastLoginAt ? 
                                new Date(userData.lastLoginAt).toLocaleDateString() : 
                                'Never'
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button 
                                  className="text-indigo-600 hover:text-indigo-900"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-green-600 hover:text-green-900"
                                  title="Edit User"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleToggleUserStatus(userData.id, userData.isActive)}
                                  className={`${userData.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                                  title={userData.isActive ? 'Deactivate User' : 'Activate User'}
                                >
                                  {userData.isActive ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                                </button>
                                {userData.id !== user?.id && (
                                  <button 
                                    onClick={() => handleDeleteUser(userData.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete User"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
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

          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Health Monitor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">API Status</p>
                        <p className="text-2xl font-bold">Online</p>
                      </div>
                      <Server className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Database</p>
                        <p className="text-2xl font-bold">Connected</p>
                      </div>
                      <Database className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Uptime</p>
                        <p className="text-2xl font-bold">{stats.systemUptime}</p>
                      </div>
                      <Activity className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Last Backup</p>
                        <p className="text-xl font-bold">Today</p>
                      </div>
                      <Download className="h-8 w-8 text-orange-200" />
                    </div>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <Server className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>System monitoring charts and logs would be displayed here</p>
                  <p className="text-sm">Real-time performance metrics and alerts</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Center</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100">Failed Login Attempts</p>
                        <p className="text-3xl font-bold">0</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Active Sessions</p>
                        <p className="text-3xl font-bold">{stats.activeUsers}</p>
                      </div>
                      <Shield className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">JWT Authentication</p>
                        <p className="text-sm text-gray-600">Token-based authentication enabled</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Password Encryption</p>
                        <p className="text-sm text-gray-600">BCrypt hashing with salt rounds</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Backup & Restore</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="h-5 w-5 mr-2" />
                        Create Full Backup
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Upload className="h-5 w-5 mr-2" />
                        Restore from Backup
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Database Operations</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Database className="h-5 w-5 mr-2" />
                        Run Migrations
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Optimize Database
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">
                      <strong>Warning:</strong> Database operations can affect system performance. 
                      Schedule during maintenance windows when possible.
                    </p>
                  </div>
                </div>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Advanced Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                        <p className="text-green-100">Warehouses</p>
                        <p className="text-3xl font-bold">{stats.totalWarehouses}</p>
                      </div>
                      <Warehouse className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Products</p>
                        <p className="text-3xl font-bold">{stats.totalProducts}</p>
                      </div>
                      <Package className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Orders</p>
                        <p className="text-3xl font-bold">{stats.totalOrders}</p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-orange-200" />
                    </div>
                  </div>
                </div>

                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Advanced analytics dashboard would be implemented here</p>
                  <p className="text-sm">Charts, graphs, and detailed system metrics</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
