import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useState } from "react";
import WarehouseSettings from './WarehouseSettings';
import CreateSectionModal from './CreateSectionModal';
import DeleteModal from "../DeleteModal";
import { deleteWarehouse } from "../../utils/http/deletes";

const WarehouseOverview = ({ warehouse, variants }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  
  const handleSwitchDelete = () => {
    setIsSettingsModalOpen(false);
    setIsDeleteModalOpen(true);
  }

  const handleDeleteWarehouse = async () => {
    try {
      await deleteWarehouse(warehouse.id);
      setIsDeleteModalOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete warehouse:', error);
    }
  }
  
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-accent-800">
                {warehouse.name}
              </h2>
              <p className="text-accent-500 text-sm font-medium uppercase tracking-wide">
                Warehouse Overview
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-3 rounded-xl bg-accent-100 hover:bg-accent-200 text-accent-600 hover:text-accent-700 transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-accent-500 uppercase tracking-wide">Description</p>
                <p className="text-accent-700 mt-1 leading-relaxed">{warehouse.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-accent-500 uppercase tracking-wide">Location</p>
                <p className="text-accent-700 mt-1">{warehouse.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2" 
            onClick={() => setIsCreateSectionModalOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create Section</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        variants={variants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Sections Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.sections.length}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Sections
          </div>
        </div>

        {/* Total Inventory Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.totalInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Total Inventory
          </div>
        </div>

        {/* Available Inventory Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.availableInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Available
          </div>
        </div>

        {/* Reserved Inventory Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.reservedInventory.toLocaleString()}
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
        {/* In Transit Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.inTransitInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            In Transit
          </div>
        </div>

        {/* Damaged Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.damagedInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Damaged
          </div>
        </div>

        {/* Expired Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.expiredInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Expired
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent-800 mb-1">
            {warehouse.outOfStockInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Out of Stock
          </div>
        </div>
      </motion.div>
      <WarehouseSettings 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDelete={handleSwitchDelete}
        warehouse={warehouse}
      />
      <DeleteModal 
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={() => setIsDeleteModalOpen(false)}
        action={handleDeleteWarehouse}
        item='warehouse'
        warningText='All data related to this warehouse will be deleted. This includes the warehouse itself, all sections, and all inventory items. This action cannot be undone.'
      />
      <CreateSectionModal 
        isOpen={isCreateSectionModalOpen}
        onClose={() => setIsCreateSectionModalOpen(false)}
        warehouseId={warehouse.id}
      />
    </div>
  );
};

export default WarehouseOverview;
