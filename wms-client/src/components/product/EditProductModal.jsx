import { useState } from 'react';
import { updateProduct } from '../../utils/http/api';
import EditModal from '../shared/EditModal';

const EditProductModal = ({ isOpen, onClose, onDelete, product }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateProduct(product.id, formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const productIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );

  const skuIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
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
      name: 'Sku',
      label: 'SKU',
      required: true,
      icon: skuIcon
    },
    {
      name: 'Name',
      label: 'Product Name',
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
    Sku: product.Sku,
    Name: product.Name,
    Description: product.Description
  };

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDelete={onDelete}
      title="Edit Product"
      subtitle="Update product information"
      icon={productIcon}
      fields={fields}
      initialData={initialData}
      submitText="Save Changes"
      loading={loading}
      allowDelete={true}
    />
  );
};

export default EditProductModal;