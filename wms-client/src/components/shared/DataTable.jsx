import { motion } from 'framer-motion';

/**
 * Reusable Data Table Component
 * Handles table display with animations, empty states, and consistent styling
 */
const DataTable = ({ 
  headers, 
  data, 
  renderRow, 
  emptyState,
  searchTerm = '',
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const rowVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  // Default empty state
  const defaultEmptyState = {
    icon: "📦",
    title: "No Items Found",
    description: "No items match your criteria."
  };

  const emptyStateConfig = emptyState || defaultEmptyState;

  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Table Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={`grid gap-4 font-semibold text-gray-700 text-sm uppercase tracking-wide`} style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
          {headers.map((header, index) => (
            <div key={index} className="flex items-center gap-2">
              {header.icon && <span>{header.icon}</span>}
              {header.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Table Body */}
      <motion.div variants={containerVariants}>
        {data.length === 0 ? (
          <motion.div 
            className="px-6 py-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">{emptyStateConfig.icon}</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{emptyStateConfig.title}</h3>
            <p className="text-gray-500">{emptyStateConfig.description}</p>
            {searchTerm && (
              <p className="text-gray-400 text-sm mt-2">
                No items match your search "{searchTerm}"
              </p>
            )}
          </motion.div>
        ) : (
          data.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 cursor-pointer transition-all duration-300"
              variants={rowVariants}
              whileHover={{ 
                scale: 1.01,
                x: 4,
                transition: { type: "spring", damping: 20, stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
              custom={index}
            >
              {renderRow(item, index)}
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default DataTable;
