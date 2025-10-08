import Modal from './shared/Modal';

const DeleteModal = ({ 
  isDeleteModalOpen, 
  onDeleteModalClose, 
  action, 
  item, 
  warningText,
  title,
  confirmText = 'Delete'
}) => {
  const deleteIcon = (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={onDeleteModalClose}
      title={title || `Delete ${item}`}
      subtitle={`Are you sure you want to delete this ${item}?`}
      icon={deleteIcon}
      size="sm"
      variant="simple"
    >
      {warningText && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium">{warningText}</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        <button 
          type="button" 
          onClick={onDeleteModalClose} 
          className="px-6 py-3 border border-accent-200 text-accent-600 rounded-xl hover:bg-accent-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button 
          type="button" 
          onClick={action} 
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;