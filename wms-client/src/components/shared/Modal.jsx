import { motion } from 'framer-motion';

/**
 * Reusable Modal Component
 * Handles all modal animations, backdrop, and basic structure
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  icon, 
  children, 
  size = 'md',
  variant = 'default' 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const variantClasses = {
    default: 'bg-white/95 backdrop-blur-sm border-white/20',
    simple: 'bg-white',
    glass: 'bg-white/70 backdrop-blur-md border-white/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`${variantClasses[variant]} rounded-2xl p-8 ${sizeClasses[size]} w-full mx-4 shadow-2xl border`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || icon) && (
          <div className="flex items-center mb-8">
            {icon && (
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md mr-4">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h2 className="text-2xl font-bold text-accent-800">{title}</h2>
              )}
              {subtitle && (
                <p className="text-accent-500 text-sm">{subtitle}</p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
