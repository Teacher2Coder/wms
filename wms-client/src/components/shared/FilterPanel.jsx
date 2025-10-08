import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

/**
 * Reusable Filter Panel Component
 * Used for filtering data with consistent styling and animations
 */
const FilterPanel = ({ 
  isOpen, 
  onToggle, 
  filters, 
  onFilterChange, 
  onClearFilters,
  filterConfig = [],
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onToggle}
          className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
            isOpen
              ? "bg-primary-50 text-primary-700 border-primary-300"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterConfig.map((config) => (
                <div key={config.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {config.label}
                  </label>
                  <select
                    value={filters[config.key] || ''}
                    onChange={(e) => onFilterChange(config.key, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">{config.placeholder || `All ${config.label}`}</option>
                    {config.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="flex items-end">
                <button
                  onClick={onClearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
