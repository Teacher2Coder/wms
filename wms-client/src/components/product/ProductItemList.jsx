import { motion } from 'framer-motion';
import { useState } from 'react';
import EditItemModal from '../item/EditItemModal';
import { getStatusColor, getStatusIcon } from '../../utils/componentHelpers';

const ItemList = ({ items }) => {

  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const hoverVariants = {
    hover: { 
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  }

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl font-bold text-accent-800 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Item Inventory
      </motion.h1>
      
      <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-accent-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Table Header */}
        <motion.div 
          className="bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-4 border-b border-accent-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-3 gap-4 font-semibold text-accent-700 text-sm uppercase tracking-wide">
            <div>Serial Number</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>
        </motion.div>

        {/* Table Body */}
        <motion.div variants={containerVariants}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="px-6 py-4 border-b border-accent-100 last:border-b-0 hover:bg-accent-25 cursor-pointer"
              variants={rowVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div 
                className="grid grid-cols-3 gap-4 items-center"
                variants={hoverVariants}
              >
                <div className="font-medium text-accent-800 font-mono">
                  {item.serialNumber}
                </div>
                <div>
                  <motion.span 
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <span className="text-sm">{getStatusIcon(item.status)}</span>
                    {item.status}
                  </motion.span>
                </div>
                <div className="text-center">
                  <motion.button
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm px-3 py-1 rounded-md hover:bg-primary-50 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Summary Statistics */}
      <motion.div 
        className="mt-6 grid grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div 
          className="bg-white rounded-lg p-4 border border-accent-100 text-center"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-2xl font-bold text-accent-800">{items.length}</div>
          <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">Total Items</div>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg p-4 border border-accent-100 text-center"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-2xl font-bold text-emerald-600">
            {items.filter(item => item.status === 'Available').length}
          </div>
          <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">Available</div>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg p-4 border border-accent-100 text-center"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-2xl font-bold text-blue-600">
            {items.filter(item => item.status === 'Reserved').length}
          </div>
          <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">Reserved</div>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg p-4 border border-accent-100 text-center"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-2xl font-bold text-yellow-600">
            {items.filter(item => item.status === 'InTransit').length}
          </div>
          <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">In Transit</div>
        </motion.div>
      </motion.div>
      <EditItemModal
        isOpen={isEditItemModalOpen}
        onClose={() => setIsEditItemModalOpen(false)}
        onDelete={() => {}}
        item={selectedItem}
      />
    </motion.div>
  )
}

export default ItemList;