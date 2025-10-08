import { useState, useEffect } from 'react';
import { getWarehouses, updateItem } from '../../utils/http/api';
import EditModal from '../shared/EditModal';

const EditItemModal = ({ isOpen, onClose, item, warehouseId, sectionId, onDelete }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const warehousesData = await getWarehouses();
        setWarehouses(warehousesData);
      } catch (error) {
        console.error('Failed to fetch warehouses:', error);
      }
    };

    if (isOpen) {
      fetchWarehouses();
    }
  }, [isOpen]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const updatedItem = {
        ...formData,
        Section: parseInt(formData.Section),
        Warehouse: parseInt(formData.Warehouse),
      };

      await updateItem(item.id, updatedItem);
      onClose();
    } catch (error) {
      console.error('Failed to update item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (formData, setFormData, e) => {
    const { name, value } = e.target;
    
    // If warehouse changes, reset section to empty
    if (name === 'Warehouse') {
      setFormData({ ...formData, [name]: value, Section: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const itemIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );

  const serialIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );

  const statusIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const warehouseIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );

  const sectionIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  // Status options
  const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'InTransit', label: 'In Transit' },
    { value: 'Reserved', label: 'Reserved' },
    { value: 'Damaged', label: 'Damaged' },
    { value: 'Expired', label: 'Expired' }
  ];

  // Warehouse options
  const warehouseOptions = warehouses.map(warehouse => ({
    value: warehouse.id,
    label: warehouse.name
  }));

  // Section options based on selected warehouse
  const getSectionOptions = (warehouseId) => {
    if (!warehouseId) return [];
    const warehouse = warehouses.find(w => w.id == warehouseId);
    return warehouse?.sections?.map(section => ({
      value: section.id,
      label: section.name
    })) || [];
  };

  const fields = [
    {
      name: 'SerialNumber',
      label: 'Serial Number',
      required: true,
      icon: serialIcon
    },
    {
      name: 'Status',
      label: 'Status',
      type: 'select',
      required: true,
      options: statusOptions,
      icon: statusIcon
    },
    {
      name: 'Warehouse',
      label: 'Warehouse',
      type: 'select',
      required: true,
      options: warehouseOptions,
      placeholder: 'Select a warehouse',
      icon: warehouseIcon
    },
    {
      name: 'Section',
      label: 'Section',
      type: 'select',
      required: true,
      options: [], // Will be populated dynamically
      placeholder: 'Select a section',
      icon: sectionIcon,
      disabled: true // Will be enabled when warehouse is selected
    }
  ];

  const initialData = item ? {
    SerialNumber: item.serialNumber || '',
    Status: item.status || '',
    Warehouse: warehouseId ? String(warehouseId) : '',
    Section: sectionId ? String(sectionId) : '',
  } : {};

  if (!isOpen || !item) {
    return null;
  }

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDelete={onDelete}
      title="Edit Item"
      subtitle="Update item information and location"
      icon={itemIcon}
      fields={fields.map(field => {
        if (field.name === 'Section') {
          return {
            ...field,
            options: getSectionOptions(initialData.Warehouse),
            disabled: !initialData.Warehouse
          };
        }
        return field;
      })}
      initialData={initialData}
      submitText="Save Changes"
      loading={loading}
      allowDelete={true}
      customHandleChange={handleChange}
    />
  );
};

export default EditItemModal;