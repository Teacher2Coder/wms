import { motion } from "framer-motion";

/**
 * Reusable Admin Card Component
 * Used for admin dashboard cards with consistent styling and animations
 */
const AdminCard = ({ 
  title, 
  value, 
  subtitle,
  icon, 
  color = 'blue',
  onClick,
  className = '',
  variant = 'gradient'
}) => {
  const colorClasses = {
    gradient: {
      blue: 'from-blue-500 to-blue-600 text-white',
      green: 'from-green-500 to-green-600 text-white',
      purple: 'from-purple-500 to-purple-600 text-white',
      orange: 'from-orange-500 to-orange-600 text-white',
      red: 'from-red-500 to-red-600 text-white',
      gray: 'from-gray-500 to-gray-600 text-white'
    },
    simple: {
      blue: 'bg-white border border-gray-200 text-gray-900',
      green: 'bg-white border border-gray-200 text-gray-900',
      purple: 'bg-white border border-gray-200 text-gray-900',
      orange: 'bg-white border border-gray-200 text-gray-900',
      red: 'bg-white border border-gray-200 text-gray-900',
      gray: 'bg-white border border-gray-200 text-gray-900'
    }
  };

  const iconColorClasses = {
    gradient: {
      blue: 'text-blue-200',
      green: 'text-green-200',
      purple: 'text-purple-200',
      orange: 'text-orange-200',
      red: 'text-red-200',
      gray: 'text-gray-200'
    },
    simple: {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      gray: 'text-gray-600'
    }
  };

  const subtitleColorClasses = {
    gradient: {
      blue: 'text-blue-100',
      green: 'text-green-100',
      purple: 'text-purple-100',
      orange: 'text-orange-100',
      red: 'text-red-100',
      gray: 'text-gray-100'
    },
    simple: {
      blue: 'text-gray-600',
      green: 'text-gray-600',
      purple: 'text-gray-600',
      orange: 'text-gray-600',
      red: 'text-gray-600',
      gray: 'text-gray-600'
    }
  };

  const baseClasses = variant === 'gradient' 
    ? `bg-gradient-to-r ${colorClasses[variant][color]} rounded-lg p-6 shadow-lg`
    : `${colorClasses[variant][color]} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`;

  const cardClasses = onClick 
    ? `${baseClasses} cursor-pointer hover:scale-105 transition-transform`
    : baseClasses;

  return (
    <motion.div
      className={`${cardClasses} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center justify-between">
        <div>
          {subtitle && (
            <p className={`text-sm ${subtitleColorClasses[variant][color]} mb-1`}>
              {subtitle}
            </p>
          )}
          <p className={`text-3xl font-bold ${variant === 'simple' ? 'text-gray-900' : ''}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {title && (
            <p className={`text-sm font-medium mt-1 ${variant === 'simple' ? 'text-gray-700' : ''}`}>
              {title}
            </p>
          )}
        </div>
        {icon && (
          <span className={`h-8 w-8 ${iconColorClasses[variant][color]}`}>
            {icon}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default AdminCard;
