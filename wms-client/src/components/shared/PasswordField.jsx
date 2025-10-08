import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable Password Field Component
 * Handles password input with show/hide toggle functionality
 */
const PasswordField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false, 
  placeholder, 
  error,
  className = '',
  variant = 'default'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseInputClasses = "w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none transition-all duration-200";
  
  const variantClasses = {
    default: "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
    simple: "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  };

  const errorClasses = error ? "border-red-300" : "border-gray-300";
  const inputClasses = `${baseInputClasses} ${variantClasses[variant]} ${errorClasses} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PasswordField;
