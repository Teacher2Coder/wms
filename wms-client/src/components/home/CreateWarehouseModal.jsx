import { motion } from 'framer-motion';
import { useState } from 'react';
import { createWarehouse } from '../../utils/http/posts';

const CreateWarehouseModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Location: '',
    Description: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const warehouse = await createWarehouse(formData);
      if (warehouse) {
        onClose();
        window.location.href = `/warehouse/${warehouse.id}`;
      }
    } catch (err) {
      console.error(err);
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
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-accent-800">Create Warehouse</h2>
            <p className="text-accent-500 text-sm">Add a new warehouse to your system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="Name" className="flex items-center text-sm font-semibold text-accent-700">
              <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Warehouse Name
            </label>
            <input 
              type="text" 
              id="Name" 
              name="Name" 
              required
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400" 
              placeholder="Enter warehouse name"
              value={formData.Name} 
              onChange={handleChange} 
            />
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label htmlFor="Location" className="flex items-center text-sm font-semibold text-accent-700">
              <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </label>
            <input 
              type="text" 
              id="Location" 
              name="Location" 
              required
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400" 
              placeholder="Enter warehouse location"
              value={formData.Location} 
              onChange={handleChange} 
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="Description" className="flex items-center text-sm font-semibold text-accent-700">
              <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description
            </label>
            <textarea 
              id="Description" 
              name="Description" 
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400 resize-none" 
              placeholder="Describe your warehouse"
              value={formData.Description} 
              onChange={handleChange} 
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-accent-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3 text-accent-600 bg-accent-50 hover:bg-accent-100 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] border border-accent-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={onCreate}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create Warehouse</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreateWarehouseModal;