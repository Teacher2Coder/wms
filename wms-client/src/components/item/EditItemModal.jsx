import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getWarehouses } from '../../utils/http/gets';
import { updateItem } from '../../utils/http/updates';

const EditItemModal = ({ isOpen, onClose, item, warehouseId, sectionId }) => {
  const { isAdmin } = useAuth();

  const [warehouses, setWarehouses] = useState([]);

  const [formData, setFormData] = useState({
    SerialNumber: '',
    Status: '',
    Warehouse: '',
    Section: '',
  });

  useEffect(() => {
    const fetchWarehouses = async () => {
      const warehouses = await getWarehouses();
      setWarehouses(warehouses);
    }

    fetchWarehouses();
    
    if (item) {
      setFormData({
        SerialNumber: item.serialNumber || '',
        Status: item.status || '',
        Warehouse: warehouseId ? String(warehouseId) : '',
        Section: sectionId ? String(sectionId) : '',
      });
    }
  }, [item, warehouseId, sectionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If warehouse changes, reset section to empty
    if (name === 'Warehouse') {
      setFormData({ ...formData, [name]: value, Section: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    console.log(typeof formData.Section);
    console.log(typeof formData.Warehouse);

    const sectionAsInt = parseInt(formData.Section);
    const warehouseAsInt = parseInt(formData.Warehouse);

    const updatedItem = {
      ...formData,
      Section: sectionAsInt,
      Warehouse: warehouseAsInt,
    };

    console.log(updatedItem);

    await updateItem(item.id, updatedItem);
    onClose();
  }
  
  if (!isOpen || !item) {
    return null;
  }
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-accent-800 mb-6">Item Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="SerialNumber" className="block text-sm font-medium text-accent-700 mb-1">
              Serial Number
            </label>
            <input 
              type="text" 
              id="SerialNumber" 
              name="SerialNumber" 
              value={formData.SerialNumber} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-accent-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="Status" className="block text-sm font-medium text-accent-700 mb-1">
              Status
            </label>
            <select 
              id="Status" 
              name="Status" 
              value={formData.Status} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-accent-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Available">Available</option>
              <option value="InTransit">In Transit</option>
              <option value="Reserved">Reserved</option>
              <option value="Damaged">Damaged</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div>
            <label htmlFor="Warehouse" className="block text-sm font-medium text-accent-700 mb-1">
              Warehouse
            </label>
            <select 
              id="Warehouse" 
              name="Warehouse" 
              value={formData.Warehouse} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-accent-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Section" className="block text-sm font-medium text-accent-700 mb-1">
              Section
            </label>
            <select 
              id="Section" 
              name="Section" 
              value={formData.Section} 
              onChange={handleChange}
              disabled={!formData.Warehouse}
              className="w-full px-3 py-2 border border-accent-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {formData.Warehouse ? "Select a section" : "Select a warehouse first"}
              </option>
              {formData.Warehouse && warehouses.find((warehouse) => warehouse.id == formData.Warehouse)?.sections?.map((section) => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-accent-600 border border-accent-300 rounded-md hover:bg-accent-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              Save
            </button>
            {isAdmin && (
              <button 
                type="button" 
                onClick={() => console.log("Item being deleted:", item)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default EditItemModal;