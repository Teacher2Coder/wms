import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Key, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getMyActions } from '../utils/http/gets';
import Actions from '../components/admin/Actions';
import EditProfile from '../components/profile/EditProfile';
import EditPassword from '../components/profile/EditPassword';
import SuccessMessage from '../components/SuccessMessage';

const Profile = () => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [actions, setActions] = useState([]);
  const [actionsLoading, setActionsLoading] = useState(true);
  const [actionsError, setActionsError] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchActions = async () => {
      try {
        setActionsLoading(true);
        setActionsError(null);
        const userActions = await getMyActions();
        setActions(userActions);
        console.log('User actions fetched:', userActions);
      } catch (error) {
        console.error('Failed to fetch user actions:', error);
        setActionsError('Failed to load your activity history');
        setActions([]); // Set empty array on error
      } finally {
        setActionsLoading(false);
      }
    };

    fetchActions();
  }, []);



  const closeModals = () => {
    setShowEditModal(false);
    setShowPasswordModal(false);
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <SuccessMessage successMessage={successMessage} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                  user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEditModal(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.firstName || 'Not specified'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.username}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.lastName || 'Not specified'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.role}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <div className="p-3 bg-gray-50 rounded-lg border flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {user.lastLoginAt && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {new Date(user.lastLoginAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <Actions 
          actions={actions} 
          loading={actionsLoading}
          error={actionsError}
        />

        <EditProfile 
          showEditModal={showEditModal} 
          closeModals={closeModals} 
          onSuccess={handleSuccess}
        />

        <EditPassword
          showPasswordModal={showPasswordModal}
          closeModals={closeModals}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};

export default Profile;
