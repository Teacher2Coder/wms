/**
 * Reusable Form Field Component
 * Handles input, textarea, and select fields with consistent styling
 */
const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false, 
  placeholder, 
  icon,
  rows,
  options, // For select fields
  className = '',
  variant = 'default',
  error = null
}) => {
  const baseInputClasses = "w-full px-4 py-3 rounded-xl border transition-all duration-200";
  
  const variantClasses = {
    default: "bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 placeholder:text-accent-400",
    simple: "focus:ring-2 focus:ring-primary-500 focus:border-transparent",
    glass: "bg-white/30 backdrop-blur-sm focus:bg-white/50 focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
  };

  const errorClasses = error ? "border-red-300" : "border-accent-200";
  const inputClasses = `${baseInputClasses} ${variantClasses[variant]} ${errorClasses} ${className}`;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows || 3}
          className={`${inputClasses} resize-none`}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={inputClasses}
      />
    );
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="flex items-center text-sm font-semibold text-accent-700">
          {icon && (
            <span className="w-4 h-4 mr-2 text-accent-500">
              {icon}
            </span>
          )}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;
