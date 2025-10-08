import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Pagination Component
 * Used for paginating data with consistent styling and functionality
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  pageSize,
  onPageChange, 
  onPageSizeChange,
  className = ''
}) => {
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between mt-6 px-4 py-3 bg-white border border-gray-200 rounded-lg ${className}`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-700">
          <span>
            Showing <span className="font-medium">{startIndex}</span> to{" "}
            <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </span>
        </div>
        
        {onPageSizeChange && (
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Show:</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-500">per page</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {currentPage > 3 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
              >
                1
              </button>
              {currentPage > 4 && (
                <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                  ...
                </span>
              )}
            </>
          )}

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                page === currentPage
                  ? "bg-primary-600 text-white border border-primary-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                  ...
                </span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default Pagination;
