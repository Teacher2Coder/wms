import { motion } from 'framer-motion';
import { useState } from 'react';
import { createSection } from '../../utils/http/posts';

const CreateSectionModal = ({ isOpen, onClose, warehouseId }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSection = await createSection(warehouseId, formData);
      onClose();
      window.location.href = `/warehouse/${warehouseId}/section/${newSection.id}`;
    } catch (err) {
      console.error(err);
    }
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-accent-800 mb-4">Create a Section</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-accent-600">Name</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-accent-200 shadow-sm focus:border-primary-500 focus:ring-primary-500" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-accent-600">Description</label>
            <textarea id="description" name="description" className="mt-1 block w-full rounded-md border-accent-200 shadow-sm focus:border-primary-500 focus:ring-primary-500" value={formData.description} onChange={handleChange} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
            <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">Create</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreateSectionModal;