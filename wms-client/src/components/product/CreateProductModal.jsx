import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createProduct } from '../../utils/http/posts';

const CreateProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    Sku: '',
    Description: '',
    SectionId: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const product = await createProduct(formData);
      if (product) {
        onClose();
        setFormData({ Sku: '', Description: '', SectionId: '' });
        window.location.reload(); // Refresh to show new product
      }
    } catch (err) {
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  }
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-accent-800">Create New Product</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-accent-100 text-accent-500 hover:text-accent-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="Sku" className="block text-sm font-medium text-accent-700 mb-2">
              SKU *
            </label>
            <input
              type="text"
              id="Sku"
              name="Sku"
              value={formData.Sku}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-accent-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Enter product SKU"
            />
          </div>
          
          <div>
            <label htmlFor="Description" className="block text-sm font-medium text-accent-700 mb-2">
              Description
            </label>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-accent-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter product description"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-accent-200 text-accent-600 rounded-xl hover:bg-accent-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreateProductModal;
