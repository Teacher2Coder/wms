import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import EditItemModal from './EditItemModal';
import { getStatusIcon, getStatusColor } from '../../utils/componentHelpers';

const ItemList = ({ items, warehouseId, sectionId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  }

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const searchLower = searchTerm.toLowerCase().trim();
    return items.filter(item => 
      item.productName?.toLowerCase().includes(searchLower) ||
      item.serialNumber?.toLowerCase().includes(searchLower)
    );
  }, [items, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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
        damping: 20,
        stiffness: 100
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120
      }
    }
  };

  const onClose = () => {
    setIsEditItemModalOpen(false);
    setTimeout(() => {
      location.reload();
    }, 200);
  }

  if (!items || items.length === 0) {
    return (
      <motion.div 
        className="w-full max-w-4xl mx-auto p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-12 border border-gray-200"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Items Found</h3>
          <p className="text-gray-500">This section doesn't contain any items yet.</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        variants={headerVariants}
      >
        <span className="text-3xl">📋</span>
        Section Items ({items.length})
      </motion.h2>

      {/* Search Bar */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative max-w-md mx-auto">
          <motion.div
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
          >
            <span className="text-gray-400 text-lg">🔍</span>
          </motion.div>
          <motion.input
            type="text"
            placeholder="Search by product name or serial number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
            whileFocus={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
            }}
            transition={{ type: "spring", damping: 15 }}
          />
          {searchTerm && (
            <motion.button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-lg">✕</span>
            </motion.button>
          )}
        </div>
        {searchTerm && (
          <motion.p 
            className="text-center text-sm text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </motion.p>
        )}
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Table Header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
            <div className="flex items-center gap-2">
              <span>🏷️</span>
              Serial Number
            </div>
            <div className="flex items-center gap-2">
              <span>📦</span>
              Product
            </div>
            <div className="flex items-center gap-2">
              <span>📊</span>
              Status
            </div>
            <div className="text-center flex items-center justify-center gap-2">
              <span>⚡</span>
              Actions
            </div>
          </div>
        </motion.div>

        {/* Table Body */}
        <motion.div variants={containerVariants}>
          {filteredItems.length === 0 && searchTerm ? (
            <motion.div 
              className="px-6 py-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-500">No items match your search criteria "{searchTerm}"</p>
              <motion.button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear search
              </motion.button>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 cursor-pointer transition-all duration-300"
              variants={rowVariants}
              whileHover={{ 
                scale: 1.01,
                x: 4,
                transition: { type: "spring", damping: 20, stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
              custom={index}
            >
              <div className="grid grid-cols-4 gap-4 items-center">
                {/* Serial Number */}
                <div className="font-mono font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border">
                  {item.serialNumber}
                </div>
                
                {/* Product Name */}
                <div className="font-medium text-gray-700">
                  {item.productName}
                </div>
                
                {/* Status */}
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
                
                {/* Actions */}
                <div className="text-center">
                  <motion.button
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
          )}
        </motion.div>
      </motion.div>

      {/* Summary Statistics */}
      <motion.div 
        className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.div 
          className="bg-white rounded-xl p-6 border border-gray-100 text-center shadow-lg"
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)"
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-3xl font-bold text-gray-800 mb-1">{filteredItems.length}</div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{searchTerm ? 'Filtered' : 'Total'} Items</div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-6 border border-emerald-100 text-center shadow-lg"
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.2)"
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-3xl font-bold text-emerald-600 mb-1">
            {filteredItems.filter(item => item.status === 'Available').length}
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Available</div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-6 border border-blue-100 text-center shadow-lg"
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.2)"
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {filteredItems.filter(item => item.status === 'Reserved').length}
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reserved</div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-6 border border-yellow-100 text-center shadow-lg"
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.2)"
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-3xl font-bold text-yellow-600 mb-1">
            {filteredItems.filter(item => item.status === 'InTransit').length}
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">In Transit</div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-6 border border-red-100 text-center shadow-lg"
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -10px rgba(239, 68, 68, 0.2)"
          }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="text-3xl font-bold text-red-600 mb-1">
            {filteredItems.filter(item => item.status === 'Damaged' || item.status === 'Expired').length}
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Issues</div>
        </motion.div>
      </motion.div>
      
      <EditItemModal
        isOpen={isEditItemModalOpen}
        onClose={onClose}
        item={selectedItem}
        warehouseId={warehouseId}
        sectionId={sectionId}
      />
    </motion.div>
  );
};

export default ItemList;