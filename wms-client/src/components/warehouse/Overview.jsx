import { Settings } from "lucide-react";
import { useState } from "react";
import Loading from '../Loading';
import WarehouseSettings from './WarehouseSettings';
import DeleteModal from "../DeleteModal";
import { deleteWarehouse } from "../../utils/http/deletes";

const Overview = ({ warehouse, loading }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const handleSwitchDelete = () => {
    setIsSettingsModalOpen(false);
    setIsDeleteModalOpen(true);
  }
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div>
      <div className="bg-white rounded-lg p-6 shadow-lg mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-accent-800 mb-4">
            Warehouse Details
          </h2>
          <Settings 
            className="w-6 h-6 text-accent-800"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Name:</span> {warehouse.name}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {warehouse.description}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Location:</span> {warehouse.location}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Sections:</span>{" "}
          {warehouse.sections.length}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Total Inventory:</span>{" "}
          {warehouse.totalInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Available Inventory:</span>{" "}
          {warehouse.availableInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Reserved Inventory:</span>{" "}
          {warehouse.reservedInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">In Transit Inventory:</span>{" "}
          {warehouse.inTransitInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Damaged Inventory:</span>{" "}
          {warehouse.damagedInventory}
        </p>
        <p className="text-accent-600 mb-4">
          <span className="font-semibold">Expired Inventory:</span>{" "}
          {warehouse.expiredInventory}
        </p>
      </div>
      <WarehouseSettings 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDelete={() => handleSwitchDelete}
        warehouse={warehouse}
      />
      <DeleteModal 
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalClose={() => setIsDeleteModalOpen(false)}
        action={deleteWarehouse}
        item='warehouse'
      />
    </div>
  );
};

export default Overview;
