import { motion } from "framer-motion";

/**
 * Reusable Admin Section Component
 * Used for admin dashboard sections with consistent styling and animations
 */
const AdminSection = ({ 
  title, 
  subtitle,
  children, 
  className = '',
  headerActions,
  noPadding = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {(title || subtitle || headerActions) && (
        <div className={`${noPadding ? 'p-6' : 'p-6 border-b border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h2 className="text-xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="flex space-x-3">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </motion.div>
  );
};

export default AdminSection;
