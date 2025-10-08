import { useState } from 'react';
import { Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import FormModal from '../shared/FormModal';
import PasswordField from '../shared/PasswordField';

const EditPassword = ({
  showPasswordModal,
  closeModals,
  onSuccess
}) => {
  const { changePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

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

  const handlePasswordSubmit = async (e) => {
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      if (result.success) {
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        closeModals();
        if (onSuccess) {
          onSuccess('Password changed successfully!');
        }
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={showPasswordModal}
      onClose={closeModals}
      onSubmit={handlePasswordSubmit}
      title="Change Password"
      submitText="Update Password"
      submitIcon={<Key className="h-4 w-4" />}
      loading={loading}
      errors={errors}
    >
      <PasswordField
        label="Current Password"
        name="currentPassword"
        value={passwordForm.currentPassword}
        onChange={handlePasswordChange}
        required={true}
        placeholder="Enter current password"
        error={errors.currentPassword}
        variant="simple"
      />

      <PasswordField
        label="New Password"
        name="newPassword"
        value={passwordForm.newPassword}
        onChange={handlePasswordChange}
        required={true}
        placeholder="Enter new password"
        error={errors.newPassword}
        variant="simple"
      />

      <PasswordField
        label="Confirm New Password"
        name="confirmPassword"
        value={passwordForm.confirmPassword}
        onChange={handlePasswordChange}
        required={true}
        placeholder="Confirm new password"
        error={errors.confirmPassword}
        variant="simple"
      />
    </FormModal>
  );
};

export default EditPassword;
