import { motion } from 'framer-motion';

/**
 * Reusable Search Bar Component
 * Used for filtering lists with consistent styling and animations
 */
const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search...", 
  resultCount = null,
  className = ""
}) => {
  return (
    <motion.div 
      className={`mb-6 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="relative max-w-md mx-auto">
        <motion.div
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", damping: 15 }}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>
        <motion.input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
          whileFocus={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
          }}
          transition={{ type: "spring", damping: 15 }}
        />
        {searchTerm && (
          <motion.button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>
      {searchTerm && resultCount !== null && (
        <motion.p 
          className="text-center text-sm text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Found {resultCount} item{resultCount !== 1 ? 's' : ''} matching "{searchTerm}"
        </motion.p>
      )}
    </motion.div>
  );
};

export default SearchBar;
