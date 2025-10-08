import { useState } from 'react';
import { updateWarehouse } from '../../utils/http/api';
import EditModal from '../shared/EditModal';

const WarehouseSettings = ({ isOpen, onClose, onDelete, warehouse }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateWarehouse(warehouse.id, formData);
      location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const warehouseIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );

  const nameIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );

  const locationIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
      label: 'Warehouse Name',
      required: true,
      icon: nameIcon
    },
    {
      name: 'Location',
      label: 'Location',
      required: true,
      icon: locationIcon
    },
    {
      name: 'Description',
      label: 'Description',
      type: 'textarea',
      icon: descriptionIcon
    }
  ];

  const initialData = {
    Id: warehouse.id,
    Name: warehouse.name,
    Location: warehouse.location,
    Description: warehouse.description
  };

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDelete={onDelete}
      title="Edit Warehouse"
      subtitle="Update warehouse information"
      icon={warehouseIcon}
      fields={fields}
      initialData={initialData}
      submitText="Save Changes"
      loading={loading}
      allowDelete={true}
    />
  );
};

export default WarehouseSettings;