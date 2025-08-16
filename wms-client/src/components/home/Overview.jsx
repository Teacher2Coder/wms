import { motion } from 'framer-motion';
import CreateWarehouseModal from './CreateWarehouseModal';
import { useState } from 'react';

const Overview = ({ itemVarients, warehouses }) => {
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  return (
    <div>
      
      {warehouses.length > 0 && (
          <motion.div 
            variants={itemVarients}
            className="mt-16"
          >
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-accent-800 mb-4">
                System Overview
              </h3>
              <p className="text-accent-600 text-lg max-w-2xl mx-auto">
                Get a comprehensive view of your entire warehouse network's inventory status and performance metrics.
              </p>
              <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mt-6"></div>
            </div>

            {/* Primary Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              
              {/* Total Warehouses Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.length}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Total Warehouses
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Across all warehouses
                  </div>
                </div>
              </motion.div>

              
              {/* Total Inventory Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.totalInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Total Items
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Across {warehouses.length} warehouse{warehouses.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </motion.div>

              {/* Available Inventory Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.availableInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Available
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Ready for use
                  </div>
                </div>
              </motion.div>

              {/* Reserved Inventory Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.reservedInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Reserved
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Allocated orders
                  </div>
                </div>
              </motion.div>

              {/* In Transit Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.inTransitInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    In Transit
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Moving between locations
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Secondary Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {/* Damaged Inventory Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.damagedInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Damaged
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Requires attention
                  </div>
                </div>
              </motion.div>

              {/* Expired Inventory Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.expiredInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Expired
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Past expiration date
                  </div>
                </div>
              </motion.div>

              {/* Out of Stock Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-3xl font-bold text-accent-800 mb-1">
                    {warehouses.reduce((total, warehouse) => total + warehouse.outOfStockInventory, 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
                    Out of Stock
                  </div>
                  <div className="text-xs text-accent-400 mt-2">
                    Needs restocking
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Section */}
            <div className="text-center mt-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto" 
                onClick={() => setIsCreateModalOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create New Warehouse</span>
              </motion.button>
            </div>
          </motion.div>
        )}
        <CreateWarehouseModal 
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          onCreate={() => {
            window.location.reload();
          }}
        />
    </div>
  )
}

export default Overview;