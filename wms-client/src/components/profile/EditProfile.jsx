import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EditProfile = ({
  showEditModal,
  closeModals,
  onSuccess,
  user
}) => {
  const { updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });

  // Initialize form when user data is available
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEditForm()) return;
    
    setLoading(true);
    setErrors({});
    
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
        closeModals();
        if (onSuccess) {
          onSuccess('Profile updated successfully!');
        }
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Profile
              </h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.username ? "border-red-300" : "border-gray-300"
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
  );
};

export default EditProfile;
