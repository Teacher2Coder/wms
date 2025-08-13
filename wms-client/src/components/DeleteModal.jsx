import { motion } from "framer-motion";

const DeleteModal = ({ isDeleteModalOpen, onDeleteModalClose, action, item, warningText }) => {
  if (!isDeleteModalOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-lg font-bold mb-2">Are you sure that you want to delete this {item}?</h2>
        {warningText && <p className="text-red-500 mb-4">{warningText}</p>}
        <div className="flex justify-end">
            <button type="button" onClick={onDeleteModalClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
            <button type="delete" onClick={action} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">Delete</button>
          </div>
      </motion.div>
    </motion.div>
  )
}

export default DeleteModal;