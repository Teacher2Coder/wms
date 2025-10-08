import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Modal from './Modal';
import FormField from './FormField';
import ModalButtons from './ModalButtons';

/**
 * Generic Edit Modal Component
 * Handles editing of warehouses, sections, products, etc.
 */
const EditModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  onDelete,
  title,
  subtitle,
  icon,
  fields,
  initialData,
  submitText = 'Save Changes',
  loading = false,
  allowDelete = false,
  customHandleChange = null
}) => {
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState(initialData || {});

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    if (customHandleChange) {
      customHandleChange(formData, setFormData, e);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      subtitle={subtitle}
      icon={icon}
      size="md"
      variant="simple"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            icon={field.icon}
            rows={field.rows}
            options={field.options}
            variant="simple"
          />
        ))}

        <ModalButtons
          onCancel={onClose}
          onSubmit={handleSubmit}
          onDelete={allowDelete && isAdmin ? handleDelete : null}
          submitText={submitText}
          loading={loading}
          showDelete={allowDelete && isAdmin}
          variant="simple"
        />
      </form>
    </Modal>
  );
};

export default EditModal;
