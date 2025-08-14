import { motion } from "framer-motion";
import { Settings } from 'lucide-react';
import { useState } from 'react';
import SectionSettings from './SectionSettings';
import DeleteModal from '../DeleteModal';
import { deleteSection } from '../../utils/http/deletes';

const SectionOverview = ({ section, warehouseId, variants }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSwitchDelete = () => {
    setIsSettingsModalOpen(false);
    setIsDeleteModalOpen(true);
  }

  const handleDeleteSection = async () => {
    try {
      await deleteSection(warehouseId, section.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete section:', error);
    } finally {
      window.location.href = `/warehouse/${warehouseId}`;
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-accent-800">
                {section.name}
              </h2>
              <p className="text-accent-500 text-sm font-medium uppercase tracking-wide">
                Section Overview
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

        {/* Description */}
        <div className="mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-accent-500 uppercase tracking-wide">Description</p>
              <p className="text-accent-700 mt-1 leading-relaxed">{section.description}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary Stats Section */}
      <motion.div 
        variants={variants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
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
            {section.totalInventory.toLocaleString()}
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
            {section.availableInventory.toLocaleString()}
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
            {section.reservedInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Reserved
          </div>
        </div>
      </motion.div>

      {/* Secondary Stats Section */}
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
            {section.inTransitInventory.toLocaleString()}
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
            {section.damagedInventory.toLocaleString()}
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
            {section.expiredInventory.toLocaleString()}
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
            {section.outOfStockInventory.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
            Out of Stock
          </div>
        </div>
      </motion.div>
      <SectionSettings 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDelete={handleSwitchDelete}
        warehouseId={warehouseId}
        section={section}
      />
      <DeleteModal 
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={() => setIsDeleteModalOpen(false)}
        action={handleDeleteSection}
        item='section'
        warningText='All data related to this section will be deleted. This includes the section itself, all inventory items. This action cannot be undone.'
      />
    </div>
  );
}

export default SectionOverview;