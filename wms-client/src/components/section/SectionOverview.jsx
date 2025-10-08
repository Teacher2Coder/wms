import { motion } from "framer-motion";
import { useState } from 'react';
import SectionSettings from './SectionSettings';
import DeleteModal from '../DeleteModal';
import OverviewHeader from "../shared/OverviewHeader";
import StatsGrid from "../shared/StatsGrid";
import { deleteSection } from '../../utils/http/api';
import { getSectionStats } from "../shared/InventoryStats";

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

  // Section icon
  const sectionIcon = (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  // Info items for the header
  const infoItems = [
    {
      label: 'Description',
      value: section.description,
      icon: (
        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Get section statistics
  const stats = getSectionStats(section);

  return (
    <div>
      {/* Header Section */}
      <OverviewHeader
        title={section.name}
        subtitle="Section Overview"
        icon={sectionIcon}
        variants={variants}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
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