import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import EditItemModal from './EditItemModal';
import SearchBar from '../shared/SearchBar';
import DataTable from '../shared/DataTable';
import StatsGrid from '../shared/StatsGrid';
import { getStatusIcon, getStatusColor } from '../../utils/componentHelpers';

const ItemList = ({ items, warehouseId, sectionId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  };

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const searchLower = searchTerm.toLowerCase().trim();
    return items.filter(item => 
      item.productName?.toLowerCase().includes(searchLower) ||
      item.serialNumber?.toLowerCase().includes(searchLower)
    );
  }, [items, searchTerm]);

  const onClose = () => {
    setIsEditItemModalOpen(false);
    setTimeout(() => {
      location.reload();
    }, 200);
  };

  // Generate stats for the items
  const getItemStats = () => [
    {
      key: 'total',
      title: searchTerm ? 'Filtered Items' : 'Total Items',
      value: filteredItems.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'gray'
    },
    {
      key: 'available',
      title: 'Available',
      value: filteredItems.filter(item => item.status === 'Available').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'emerald'
    },
    {
      key: 'reserved',
      title: 'Reserved',
      value: filteredItems.filter(item => item.status === 'Reserved').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      key: 'inTransit',
      title: 'In Transit',
      value: filteredItems.filter(item => item.status === 'InTransit').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: 'yellow'
    },
    {
      key: 'issues',
      title: 'Issues',
      value: filteredItems.filter(item => item.status === 'Damaged' || item.status === 'Expired').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'red'
    }
  ];

  // Table headers
  const headers = [
    {
      label: 'Serial Number',
      icon: '🏷️'
    },
    {
      label: 'Product',
      icon: '📦'
    },
    {
      label: 'Status',
      icon: '📊'
    },
    {
      label: 'Actions',
      icon: '⚡'
    }
  ];

  // Render table row
  const renderRow = (item, index) => (
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
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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
  );

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 120 }}
      >
        <span className="text-3xl">📋</span>
        Section Items ({items.length})
      </motion.h2>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by product name or serial number..."
        resultCount={filteredItems.length}
      />
      
      {/* Data Table */}
      <DataTable
        headers={headers}
        data={filteredItems}
        renderRow={renderRow}
        searchTerm={searchTerm}
        emptyState={{
          icon: "🔍",
          title: "No items found",
          description: "No items match your search criteria."
        }}
      />

      {/* Summary Statistics */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <StatsGrid stats={getItemStats()} className="mt-8" />
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