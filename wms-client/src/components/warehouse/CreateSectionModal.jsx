import { useState } from 'react';
import { createSection } from '../../utils/http/api';
import CreateModal from '../shared/CreateModal';

const CreateSectionModal = ({ isOpen, onClose, warehouseId }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const newSection = await createSection(warehouseId, formData);
      onClose();
      window.location.href = `/warehouse/${warehouseId}/section/${newSection.id}`;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sectionIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  const nameIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );

  const descriptionIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const fields = [
    {
      name: 'Name',
      label: 'Section Name',
      required: true,
      placeholder: 'Enter section name',
      icon: nameIcon
    },
    {
      name: 'Description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe this section',
      icon: descriptionIcon,
      rows: 3
    }
  ];

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create Section"
      subtitle="Add a new section to this warehouse"
      icon={sectionIcon}
      fields={fields}
      submitText="Create Section"
      loading={loading}
    />
  );
};

export default CreateSectionModal;