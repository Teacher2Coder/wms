import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit3, Key, Save, X, Eye, EyeOff, Calendar, Shield, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || ''
      });
    }
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEditForm = () => {
    const newErrors = {};
    
    if (!editForm.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!editForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!editForm.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (editForm.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEditForm()) return;
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      const result = await updateProfile({
        id: user.id,
        username: editForm.username,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        role: user.role, // Keep the current role
        isActive: user.isActive // Keep the current status
      });
      
      if (result.success) {
        setSuccessMessage('Profile updated successfully!');
        setShowEditModal(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      if (result.success) {
        setSuccessMessage('Password changed successfully!');
        setShowPasswordModal(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowPasswordModal(false);
    setErrors({});
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
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
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-6 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEditModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeModals}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
                  <button
                    onClick={closeModals}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {errors.general && (
                  <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleEditChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleEditChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleEditChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.username ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                    <button
                      type="button"
                      onClick={closeModals}
                      className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Change Password Modal */}
        <AnimatePresence>
          {showPasswordModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeModals}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                  <button
                    onClick={closeModals}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {errors.general && (
                  <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.newPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Key className="h-4 w-4 mr-2" />
                          Update Password
                        </>
                      )}
                    </motion.button>
                    <button
                      type="button"
                      onClick={closeModals}
                      className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
