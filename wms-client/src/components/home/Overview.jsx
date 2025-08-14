import { motion } from 'framer-motion';
import CreateWarehouseModal from './CreateWarehouseModal';
import { useState } from 'react';
import Loading from '../Loading';

const Overview = ({ itemVarients, warehouses }) => {
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  return (
    <div>
      
      {warehouses.length > 0 && (
          <motion.div 
            variants={itemVarients}
            className="text-center mt-16"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-glow">
              <h3 className="text-2xl font-bold text-accent-800 mb-4">
                Your Warehouse Overview
              </h3>
              <p>Total Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.totalInventory, 0)}</p>
              <p>Available Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.availableInventory, 0)}</p>
              <p>Reserved Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.reservedInventory, 0)}</p>
              <p>In Transit Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.inTransitInventory, 0)}</p>
              <p>Damaged Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.damagedInventory, 0)}</p>
              <p>Expired Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.expiredInventory, 0)}</p>
              <p>Out of Stock Inventory: {warehouses.reduce((total, warehouse) => total + warehouse.outOfStockInventory, 0)}</p>
              <button 
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 mt-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg" 
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create a Warehouse
              </button>
            </div>
          </motion.div>
        )}
        <CreateWarehouseModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
    </div>
  )
}

export default Overview;