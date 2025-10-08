import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import FormModal from '../shared/FormModal';
import FormField from '../shared/FormField';

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

  const userIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
  
  return (
    <FormModal
      isOpen={showEditModal}
      onClose={closeModals}
      onSubmit={handleEditSubmit}
      title="Edit Profile"
      submitText="Save Changes"
      submitIcon={<Save className="h-4 w-4" />}
      loading={loading}
      errors={errors}
    >
      <FormField
        label="First Name"
        name="firstName"
        value={editForm.firstName}
        onChange={handleEditChange}
        required={true}
        placeholder="Enter your first name"
        icon={userIcon}
        variant="simple"
        error={errors.firstName}
      />

      <FormField
        label="Last Name"
        name="lastName"
        value={editForm.lastName}
        onChange={handleEditChange}
        required={true}
        placeholder="Enter your last name"
        icon={userIcon}
        variant="simple"
        error={errors.lastName}
      />

      <FormField
        label="Username"
        name="username"
        value={editForm.username}
        onChange={handleEditChange}
        required={true}
        placeholder="Enter your username"
        icon={userIcon}
        variant="simple"
        error={errors.username}
      />
    </FormModal>
  );
};

export default EditProfile;
