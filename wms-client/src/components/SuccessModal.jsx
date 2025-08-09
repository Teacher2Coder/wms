import { motion } from "framer-motion";

const SuccessModal = ({ isOpen, onClose, successMessage }) => {
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
        <h2 className="text-2xl font-bold text-accent-800 mb-4">Success!!!</h2>
        <p>{successMessage}</p>
      </motion.div>
    </motion.div>
  )
}

export default SuccessModal;