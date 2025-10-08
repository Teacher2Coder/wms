import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown, ChevronsUpDown, AlertCircle } from "lucide-react";
import AdminSection from "./AdminSection";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import Loading from "../Loading";

/**
 * Reusable Sortable Table Component
 * Handles complex table functionality with sorting, filtering, pagination, and search
 */
const SortableTable = ({
  title,
  subtitle,
  data = [],
  columns = [],
  loading = false,
  error = null,
  searchConfig = {},
  filterConfig = [],
  defaultSort = { key: null, direction: "desc" },
  defaultPageSize = 25,
  renderRow,
  headerActions,
  className = ""
}) => {
  const [sortConfig, setSortConfig] = useState(defaultSort);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Initialize filters
  useEffect(() => {
    const initialFilters = {};
    filterConfig.forEach(config => {
      initialFilters[config.key] = '';
    });
    setFilters(initialFilters);
  }, [filterConfig]);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  // Apply search, filters, sorting, and pagination
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchTerm && searchConfig.fields) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        searchConfig.fields.some(field => {
          const value = item[field];
          return value?.toString().toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'isSuccessful') {
          filtered = filtered.filter(item => item[key] === (value === 'true'));
        } else if (key === 'dateRange') {
          const now = new Date();
          let cutoffDate;
          switch (value) {
            case "today":
              cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
            filtered = filtered.filter(item => new Date(item.timestamp) >= cutoffDate);
          }
        } else {
          filtered = filtered.filter(item => item[key] === value);
        }
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
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
    }

    // Apply pagination
    const totalCount = filtered.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      totalCount,
      filteredCount: filtered.length
    };
  }, [data, searchTerm, filters, sortConfig, currentPage, pageSize, searchConfig.fields]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 text-primary-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary-600" />
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const clearedFilters = {};
    filterConfig.forEach(config => {
      clearedFilters[config.key] = '';
    });
    setFilters(clearedFilters);
    setSearchTerm("");
  };

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

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminSection
      title={title}
      subtitle={subtitle}
      headerActions={headerActions}
      className={className}
      noPadding={true}
    >
      <div className="p-6">
        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder={searchConfig.placeholder || "Search..."}
          resultCount={processedData.filteredCount}
        />

        {/* Filter Panel */}
        {filterConfig.length > 0 && (
          <FilterPanel
            isOpen={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            filterConfig={filterConfig}
          />
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-8 text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && processedData.data.length === 0 && (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <span>No data found</span>
          </div>
        )}

        {/* Table */}
        {!loading && !error && processedData.data.length > 0 && (
          <motion.div
            className="overflow-x-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                      }`}
                      onClick={column.sortable ? () => handleSort(column.key) : undefined}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.label}</span>
                        {column.sortable && getSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedData.data.map((item, index) => (
                  <motion.tr
                    key={item.id || index}
                    variants={itemVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {renderRow(item, index)}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && !error && processedData.totalCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(processedData.filteredCount / pageSize)}
            totalItems={processedData.filteredCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </AdminSection>
  );
};

export default SortableTable;
