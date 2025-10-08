/**
 * Reusable Modal Button Component
 * Handles common button layouts for modals (Cancel/Submit, Cancel/Edit/Delete, etc.)
 */
const ModalButtons = ({ 
  onCancel, 
  onSubmit, 
  onDelete,
  submitText = 'Submit',
  cancelText = 'Cancel',
  deleteText = 'Delete',
  loading = false,
  showDelete = false,
  submitIcon,
  variant = 'default'
}) => {
  const buttonBaseClasses = "flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02]";
  
  const variantClasses = {
    default: {
      cancel: "text-accent-600 bg-accent-50 hover:bg-accent-100 border border-accent-200",
      submit: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl",
      delete: "bg-red-500 hover:bg-red-600 text-white"
    },
    simple: {
      cancel: "border border-accent-200 text-accent-600 hover:bg-accent-50",
      submit: "bg-primary-500 hover:bg-primary-600 text-white",
      delete: "bg-red-500 hover:bg-red-600 text-white"
    }
  };

  const classes = variantClasses[variant];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-accent-100">
      <button 
        type="button" 
        onClick={onCancel} 
        className={`${buttonBaseClasses} ${classes.cancel}`}
      >
        {cancelText}
      </button>
      
      <button 
        type="submit" 
        onClick={onSubmit}
        disabled={loading}
        className={`${buttonBaseClasses} ${classes.submit} flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {submitIcon && !loading && (
          <span className="w-5 h-5">
            {submitIcon}
          </span>
        )}
        {loading && (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )}
        <span>{loading ? 'Processing...' : submitText}</span>
      </button>

      {showDelete && (
        <button 
          type="button" 
          onClick={onDelete} 
          className={`${buttonBaseClasses} ${classes.delete}`}
        >
          {deleteText}
        </button>
      )}
    </div>
  );
};

export default ModalButtons;
