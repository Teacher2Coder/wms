import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Reusable Overview Header Component
 * Used for warehouse and section overview headers with consistent styling
 */
const OverviewHeader = ({ 
  title, 
  subtitle, 
  icon, 
  variants,
  onSettingsClick,
  actionButton,
  showSettings = true,
  infoItems = []
}) => {
  const { canManage } = useAuth();

  return (
    <motion.div 
      variants={variants}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-accent-800">
              {title}
            </h2>
            <p className="text-accent-500 text-sm font-medium uppercase tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>
        {canManage && showSettings && (
          <button
            onClick={onSettingsClick}
            className="p-3 rounded-xl bg-accent-100 hover:bg-accent-200 text-accent-600 hover:text-accent-700 transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Info Items (Description, Location, etc.) */}
      {infoItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {infoItems.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-accent-500 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-accent-700 mt-1 leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      {canManage && actionButton && (
        <div className="flex justify-end">
          {actionButton}
        </div>
      )}
    </motion.div>
  );
};

export default OverviewHeader;
