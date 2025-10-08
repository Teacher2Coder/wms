import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import WarehouseSettings from './WarehouseSettings';
import CreateSectionModal from './CreateSectionModal';
import DeleteModal from "../DeleteModal";
import OverviewHeader from "../shared/OverviewHeader";
import StatsGrid from "../shared/StatsGrid";
import { deleteWarehouse } from "../../utils/http/api";
import { getWarehouseStats } from "../shared/InventoryStats";

const WarehouseOverview = ({ warehouse, variants }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  const { canManage } = useAuth();
  
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

  // Warehouse icon
  const warehouseIcon = (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );

  // Info items for the header
  const infoItems = [
    {
      label: 'Description',
      value: warehouse.description,
      icon: (
        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Location',
      value: warehouse.location,
      icon: (
        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  // Action button for creating sections
  const actionButton = canManage ? (
    <button
      className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2" 
      onClick={() => setIsCreateSectionModalOpen(true)}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>Create Section</span>
    </button>
  ) : null;

  // Get warehouse statistics
  const stats = getWarehouseStats(warehouse);
  
  return (
    <div>
      {/* Header Section */}
      <OverviewHeader
        title={warehouse.name}
        subtitle="Warehouse Overview"
        icon={warehouseIcon}
        variants={variants}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
        actionButton={actionButton}
        infoItems={infoItems}
      />

      {/* Primary Stats Section */}
      <motion.div variants={variants}>
        <StatsGrid stats={stats.primary} className="mb-8" />
      </motion.div>

      {/* Secondary Stats Section */}
      <motion.div variants={variants}>
        <StatsGrid stats={stats.secondary} className="mb-12" />
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
