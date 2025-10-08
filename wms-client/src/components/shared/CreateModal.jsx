import { useState } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import ModalButtons from './ModalButtons';

/**
 * Generic Create Modal Component
 * Handles creation of warehouses, sections, products, etc.
 */
const CreateModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  title,
  subtitle,
  icon,
  fields,
  submitText = 'Create',
  loading = false
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    return initialData;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    // Reset form
    const resetData = {};
    fields.forEach(field => {
      resetData[field.name] = field.defaultValue || '';
    });
    setFormData(resetData);
  };

  const submitIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      subtitle={subtitle}
      icon={icon}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            icon={field.icon}
            rows={field.rows}
            options={field.options}
          />
        ))}

        <ModalButtons
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitText={submitText}
          loading={loading}
          submitIcon={submitIcon}
        />
      </form>
    </Modal>
  );
};

export default CreateModal;
