import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Filter,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Shield,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getAllActions,
  getUserActions,
  getMyActions,
} from "../../utils/http/gets";
import {
  getActionTypeIcon,
  getActionTypeColor,
  getUserRoleColor,
} from "../../utils/componentHelpers.jsx";
import { formatDate } from "../../utils/helpers";
import handleSmoothScroll from "../../utils/handleSmoothScroll";
import Loading from "../Loading";

const ActionSort = ({ userId = null, showMyActions = false }) => {
  const [actions, setActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    actionType: "",
    entityType: "",
    userRole: "",
    isSuccessful: "",
    dateRange: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  useEffect(() => {
    fetchActions();
  }, [userId, showMyActions]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [actions, filters, searchTerm, sortConfig, currentPage, pageSize]);

  useEffect(() => {
    // Reset to first page when filters or search change
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const fetchActions = async () => {
    try {
      setLoading(true);
      setError(null);
      let fetchedActions;

      if (showMyActions) {
        fetchedActions = await getMyActions();
      } else if (userId) {
        fetchedActions = await getUserActions(userId);
      } else {
        fetchedActions = await getAllActions();
      }

      setActions(fetchedActions);
    } catch (error) {
      console.error("Failed to fetch actions:", error);
      setError("Failed to load actions");
      setActions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === "timestamp") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string sorting (case insensitive)
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...actions];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (action) =>
          action.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          action.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          action.entityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          action.entityType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.actionType) {
      filtered = filtered.filter(
        (action) => action.actionType === filters.actionType
      );
    }
    if (filters.entityType) {
      filtered = filtered.filter(
        (action) => action.entityType === filters.entityType
      );
    }
    if (filters.userRole) {
      filtered = filtered.filter(
        (action) => action.userRole === filters.userRole
      );
    }
    if (filters.isSuccessful !== "") {
      filtered = filtered.filter(
        (action) => action.isSuccessful === (filters.isSuccessful === "true")
      );
    }
    if (filters.dateRange) {
      const now = new Date();
      let cutoffDate;
      switch (filters.dateRange) {
        case "today":
          cutoffDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "week":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = null;
      }
      if (cutoffDate) {
        filtered = filtered.filter(
          (action) => new Date(action.timestamp) >= cutoffDate
        );
      }
    }

    // Sort the filtered data
    const sorted = sortedData(filtered);
    setTotalFilteredCount(sorted.length);

    // Apply pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = sorted.slice(startIndex, endIndex);

    setFilteredActions(paginatedData);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-600" />
    );
  };

  const getUniqueValues = (key) => {
    return [...new Set(actions.map((action) => action[key]).filter(Boolean))];
  };

  const clearFilters = () => {
    setFilters({
      actionType: "",
      entityType: "",
      userRole: "",
      isSuccessful: "",
      dateRange: "",
    });
    setSearchTerm("");
  };

  // Pagination helper functions
  const totalPages = Math.ceil(totalFilteredCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalFilteredCount);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

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

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {showMyActions
            ? "My Actions"
            : userId
            ? "User Actions"
            : "All User Actions"}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Show:</label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-500">per page</span>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              showFilters
                ? "bg-blue-50 text-blue-700 border-blue-300"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <span className="text-sm text-gray-500">
            {totalFilteredCount > 0
              ? `${startIndex}-${endIndex} of ${totalFilteredCount}`
              : "0"}{" "}
            actions
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search actions by user, description, entity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action Type
                </label>
                <select
                  value={filters.actionType}
                  onChange={(e) =>
                    setFilters({ ...filters, actionType: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {getUniqueValues("actionType").map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entity Type
                </label>
                <select
                  value={filters.entityType}
                  onChange={(e) =>
                    setFilters({ ...filters, entityType: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Entities</option>
                  {getUniqueValues("entityType").map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Role
                </label>
                <select
                  value={filters.userRole}
                  onChange={(e) =>
                    setFilters({ ...filters, userRole: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Roles</option>
                  {getUniqueValues("userRole").map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.isSuccessful}
                  onChange={(e) =>
                    setFilters({ ...filters, isSuccessful: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="true">Successful</option>
                  <option value="false">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-8 text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredActions.length === 0 && (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Clock className="h-5 w-5 mr-2" />
          <span>No actions found</span>
        </div>
      )}

      {/* Actions Table */}
      {!loading && !error && filteredActions.length > 0 && (
        <motion.div
          className="overflow-x-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("timestamp")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {getSortIcon("timestamp")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("username")}
                >
                  <div className="flex items-center space-x-1">
                    <span>User</span>
                    {getSortIcon("username")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("actionType")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Action</span>
                    {getSortIcon("actionType")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("entityType")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Entity</span>
                    {getSortIcon("entityType")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActions.map((action) => (
                <motion.tr
                  key={action.id}
                  variants={itemVariants}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(action.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {action.username || "Unknown User"}
                        </div>
                        {action.userRole && (
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUserRoleColor(
                              action.userRole
                            )}`}
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {action.userRole}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getActionTypeIcon(action.actionType)}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionTypeColor(
                          action.actionType
                        )}`}
                      >
                        {action.actionType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{action.entityType}</div>
                      {action.entityName && (
                        <div className="text-gray-500">{action.entityName}</div>
                      )}
                      {action.entityId && (
                        <div className="text-xs text-gray-400">
                          ID: {action.entityId}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {action.isSuccessful ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/action/${action.id}`}
                      onClick={() => handleSmoothScroll()}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && totalFilteredCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mt-6 px-4 py-3 bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing <span className="font-medium">{startIndex}</span> to{" "}
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{totalFilteredCount}</span> results
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
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
                    onClick={() => handlePageChange(1)}
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
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    page === currentPage
                      ? "bg-blue-600 text-white border border-blue-600"
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
                    onClick={() => handlePageChange(totalPages)}
                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
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
      )}
    </motion.div>
  );
};

export default ActionSort;
