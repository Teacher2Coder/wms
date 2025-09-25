import { useState } from "react";
import { motion } from "framer-motion";

const CheckIn = () => {
  const [formData, setFormData] = useState({
    Sku: "",
    SerialNumber: "",
    Warehouse: "",
    Section: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 flex justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl border border-white/20 mt-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md mr-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-accent-800">
              Check in Item
            </h2>
            <p className="text-accent-500 text-sm">
              Add a new item to a warehouse
            </p>
          </div>
        </div>

        <form onSubmit={() => {}} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="Sku"
              className="flex items-center text-sm font-semibold text-accent-700"
            >
              <svg
                className="w-4 h-4 mr-2 text-accent-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Item Sku
            </label>
            <input
              type="text"
              id="Sku"
              name="Sku"
              required
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
              placeholder="Enter item sku"
              value={formData.Sku}
              onChange={handleChange}
            />
          </div>

          {/* Serial Number Field */}
          <div className="space-y-2">
            <label
              htmlFor="SerialNumber"
              className="flex items-center text-sm font-semibold text-accent-700"
            >
              <svg
                className="w-4 h-4 mr-2 text-accent-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z"
                />
              </svg>
              Serial Number
            </label>
            <input
              type="text"
              id="SerialNumber"
              name="SerialNumber"
              required
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
              placeholder="Enter serial number"
              value={formData.SerialNumber}
              onChange={handleChange}
            />
          </div>

          {/* Warehouse Field */}
          <div className="space-y-2">
            <label
              htmlFor="Warehouse"
              className="flex items-center text-sm font-semibold text-accent-700"
            >
              <svg
                className="w-4 h-4 mr-2 text-accent-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Warehouse
            </label>
            <input
              type="text"
              id="Warehouse"
              name="Warehouse"
              required
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
              placeholder="Enter warehouse"
              value={formData.Warehouse}
              onChange={handleChange}
            />
          </div>

          {/* Section Field */}
          <div className="space-y-2">
            <label
              htmlFor="Section"
              className="flex items-center text-sm font-semibold text-accent-700"
            >
              <svg
                className="w-4 h-4 mr-2 text-accent-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Section
            </label>
          </div>
          <input
            type="text"
            id="Section"
            name="Section"
            required
            className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
            placeholder="Enter section"
            value={formData.Section}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-accent-100">
            <button
              type="button"
              onClick={() => {}}
              className="flex-1 px-6 py-3 text-accent-600 bg-accent-50 hover:bg-accent-100 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] border border-accent-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Check in Item</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckIn;
