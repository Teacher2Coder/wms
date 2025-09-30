import { motion } from 'framer-motion';
import { useState } from 'react';
import CreateProductModal from './CreateProductModal';
import DeleteModal from '../DeleteModal';
import { useAuth } from '../../contexts/AuthContext';

const ProductsOverview = ({ products, variants, onRefresh }) => {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const { canManage } = useAuth(); // Only Admin and Manager can create products
  
  // Calculate statistics from products data
  const totalProducts = products ? products.length : 0;
  const totalItems = products ? products.reduce((sum, product) => sum + (product.items ? product.items.length : 0), 0) : 0;
  
  // Calculate item statistics by status
  const availableItems = products ? products.reduce((sum, product) => 
    sum + (product.items ? product.items.filter(item => item.status === 0).length : 0), 0) : 0; // Available = 0
  const reservedItems = products ? products.reduce((sum, product) => 
    sum + (product.items ? product.items.filter(item => item.status === 1).length : 0), 0) : 0; // Reserved = 1
  const inTransitItems = products ? products.reduce((sum, product) => 
    sum + (product.items ? product.items.filter(item => item.status === 2).length : 0), 0) : 0; // InTransit = 2
  const damagedItems = products ? products.reduce((sum, product) => 
    sum + (product.items ? product.items.filter(item => item.status === 3).length : 0), 0) : 0; // Damaged = 3
  const expiredItems = products ? products.reduce((sum, product) => 
    sum + (product.items ? product.items.filter(item => item.status === 4).length : 0), 0) : 0; // Expired = 4
  const outOfStockProducts = products ? products.filter(product => !product.items || product.items.length === 0).length : 0;

  return (
    <div>
      {/* Header Section */}
      <motion.div 
        variants={variants}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-accent-800">
                Product Management
              </h2>
              <p className="text-accent-500 text-sm font-medium uppercase tracking-wide">
                System Overview
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-accent-500 uppercase tracking-wide">Total Products</p>
                <p className="text-accent-700 mt-1 leading-relaxed">{totalProducts} products registered</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-accent-500 uppercase tracking-wide">Total Items</p>
                <p className="text-accent-700 mt-1">{totalItems} individual items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Only show for Admin/Manager */}
        {canManage && (
          <div className="flex justify-end">
            <button
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2" 
              onClick={() => setIsCreateProductModalOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create Product</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        variants={variants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Total Products Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {totalProducts}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Products
          </div>
        </div>

        {/* Total Items Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {totalItems.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Total Items
          </div>
        </div>

        {/* Available Items Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {availableItems.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Available
          </div>
        </div>

        {/* Reserved Items Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {reservedItems.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Reserved
          </div>
        </div>
      </motion.div>

      {/* Additional Stats Section */}
      <motion.div 
        variants={variants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {/* In Transit Items Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {inTransitItems.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            In Transit
          </div>
        </div>

        {/* Damaged Items Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {damagedItems.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Damaged
          </div>
        </div>

        {/* Expired Items Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {expiredItems.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Expired
          </div>
        </div>

        {/* Out of Stock Products Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {outOfStockProducts.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Out of Stock
          </div>
        </div>
      </motion.div>
      
      <CreateProductModal 
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
        onSuccess={onRefresh}
      />
    </div>
  );
}

export default ProductsOverview;