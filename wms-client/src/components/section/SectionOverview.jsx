import { Settings } from 'lucide-react';
import { useState } from 'react';
import Loading from '../Loading';
import SectionSettings from './SectionSettings';
import DeleteModal from '../DeleteModal';
import { deleteSection } from '../../utils/http/deletes';

const SectionOverview = ({ section, warehouseId, loading }) => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="bg-white rounded-lg p-6 shadow-lg mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-accent-800 mb-4">
            Section Details
          </h2>
          <Settings 
            className="w-6 h-6 text-accent-800"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Name:</span> {section.name}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {section.description}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Total Inventory:</span>{" "}
          {section.totalInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Available Inventory:</span>{" "}
          {section.availableInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Reserved Inventory:</span>{" "}
          {section.reservedInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">In Transit Inventory:</span>{" "}
          {section.inTransitInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Damaged Inventory:</span>{" "}
          {section.damagedInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Expired Inventory:</span>{" "}
          {section.expiredInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Out of Stock Inventory:</span>{" "}
          {section.outOfStockInventory}
        </p>
      </div>
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