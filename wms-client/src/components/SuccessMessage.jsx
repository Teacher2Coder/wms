import { motion, AnimatePresence } from "framer-motion";

const SuccessMessage = ({ successMessage }) => {
  return (
    <AnimatePresence>
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="mb-6 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg"
        >
          {successMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessMessage;
