import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ExternalLink } from 'lucide-react';
import Loading from '../Loading';

const WarehouseCards = ({ itemVarients, warehouses, loading, containerVariants, cardVariants }) => {  
  
  return (
    <div>
      {/* Warehouses Section */}
      <motion.div variants={itemVarients} className="mb-8">
          <h2 className="text-3xl font-bold text-center text-accent-800 mb-2">
            Your Warehouses
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div 
            variants={itemVarients}
            className="text-center py-20"
          >
            <Loading />
          </motion.div>
        ) : warehouses.length === 0 ? (
          /* Empty State */
          <motion.div 
            variants={itemVarients}
            className="text-center py-20"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-glow">
              <div className="w-16 h-16 mx-auto mb-6 bg-accent-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent-800 mb-2">No Warehouses Found</h3>
              <p className="text-accent-600">Start by adding your first warehouse to get started.</p>
            </div>
          </motion.div>
        ) : (
          /* Warehouse Table */
          <motion.div 
            variants={containerVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-glow border border-white/50 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent-800">Warehouse</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent-800">Location</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">Total</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">Available</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">Reserved</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">In Transit</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">Damaged</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">Expired</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-accent-800">Out of Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-200">
                  {warehouses.map((warehouse, index) => (
                    <motion.tr
                      key={warehouse.id}
                      variants={cardVariants}
                      custom={index}
                      className="hover:bg-primary-50/50 transition-all duration-200 group cursor-pointer"
                      onClick={() => window.location.href = `/warehouse/${warehouse.id}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <Link 
                              to={`/warehouse/${warehouse.id}`} 
                              className="font-semibold text-accent-800 hover:text-primary-600 transition-colors flex items-center space-x-1 group/link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{warehouse.name}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </Link>
                            <div className="text-sm text-accent-600">{warehouse.description || "No description available"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-accent-600">
                        {warehouse.location || "No location specified"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {warehouse.totalInventory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {warehouse.availableInventory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {warehouse.reservedInventory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {warehouse.inTransitInventory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {warehouse.damagedInventory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {warehouse.expiredInventory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-gray-800">
                          {warehouse.outOfStockInventory}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
    </div>
  )
}

export default WarehouseCards;