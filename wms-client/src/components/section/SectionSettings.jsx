import { useState } from 'react';
import { updateSection } from '../../utils/http/api';
import EditModal from '../shared/EditModal';

const SectionSettings = ({ isOpen, onClose, onDelete, warehouseId, section }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateSection(warehouseId, section.id, formData);
      location.reload();
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
      icon: nameIcon
    },
    {
      name: 'Description',
      label: 'Description',
      type: 'textarea',
      icon: descriptionIcon
    }
  ];

  const initialData = {
    Id: section.id,
    Name: section.name,
    Description: section.description
  };

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDelete={onDelete}
      title="Edit Section"
      subtitle="Update section information"
      icon={sectionIcon}
      fields={fields}
      initialData={initialData}
      submitText="Save Changes"
      loading={loading}
      allowDelete={true}
    />
  );
};

export default SectionSettings;