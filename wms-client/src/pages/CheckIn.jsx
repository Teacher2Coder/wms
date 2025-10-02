import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { searchProductsBySku, searchWarehouses, getSections } from "../utils/http/gets";
import { checkInItem } from "../utils/http/posts";
import SuccessMessage from "../components/SuccessMessage";

const CheckIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Sku: "",
    SerialNumber: "",
    Warehouse: 0,
    Section: 0,
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Product search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Warehouse search state
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState("");
  const [warehouseSearchResults, setWarehouseSearchResults] = useState([]);
  const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isWarehouseSearching, setIsWarehouseSearching] = useState(false);
  const warehouseDropdownRef = useRef(null);
  const warehouseSearchTimeoutRef = useRef(null);

  // Section search state
  const [sectionSearchTerm, setSectionSearchTerm] = useState("");
  const [availableSections, setAvailableSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const sectionDropdownRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle product search
  const handleSkuSearch = async (value) => {
    setSearchTerm(value);
    setIsDropdownOpen(true);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchProductsBySku(value);
        setSearchResults(results || []);
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 100);
  };

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setFormData({ ...formData, Sku: product.sku });
    setSearchTerm(product.sku);
    setIsDropdownOpen(false);
    setSearchResults([]);
  };

  // Handle warehouse search
  const handleWarehouseSearch = async (value) => {
    setWarehouseSearchTerm(value);
    setIsWarehouseDropdownOpen(true);

    if (value.trim().length < 2) {
      setWarehouseSearchResults([]);
      setIsWarehouseSearching(false);
      return;
    }

    setIsWarehouseSearching(true);

    // Clear previous timeout
    if (warehouseSearchTimeoutRef.current) {
      clearTimeout(warehouseSearchTimeoutRef.current);
    }

    // Debounce search
    warehouseSearchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchWarehouses(value);
        setWarehouseSearchResults(results || []);
      } catch (error) {
        console.error('Error searching warehouses:', error);
        setWarehouseSearchResults([]);
      } finally {
        setIsWarehouseSearching(false);
      }
    }, 300);
  };

  // Handle warehouse selection
  const handleWarehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setFormData({ ...formData, Warehouse: warehouse.id, Section: 0 });
    setWarehouseSearchTerm(warehouse.name);
    setIsWarehouseDropdownOpen(false);
    setWarehouseSearchResults([]);
    
    // Clear section selection and use sections from warehouse data
    setSelectedSection(null);
    setSectionSearchTerm("");
    
    // Check if warehouse has sections property, otherwise load from API
    if (warehouse.sections && Array.isArray(warehouse.sections)) {
      setAvailableSections(warehouse.sections);
      setFilteredSections(warehouse.sections);
      setIsSectionLoading(false);
    } else {
      // Fallback to API call if warehouse doesn't include sections
      setFilteredSections([]);
      loadSectionsForWarehouse(warehouse.id);
    }
  };

  // Load sections for a specific warehouse
  const loadSectionsForWarehouse = async (warehouseId) => {
    setIsSectionLoading(true);
    try {
      const sections = await getSections(warehouseId);
      
      // Ensure sections is always an array
      const sectionsArray = Array.isArray(sections) ? sections : [];
      setAvailableSections(sectionsArray);
      setFilteredSections(sectionsArray);
    } catch (error) {
      console.error('Error loading sections:', error);
      setAvailableSections([]);
      setFilteredSections([]);
    } finally {
      setIsSectionLoading(false);
    }
  };

  // Handle section search
  const handleSectionSearch = (value) => {
    setSectionSearchTerm(value);
    setIsSectionDropdownOpen(true);

    if (!selectedWarehouse) {
      setFilteredSections([]);
      return;
    }

    if (value.trim().length === 0) {
      // Ensure availableSections is an array before setting it
      setFilteredSections(Array.isArray(availableSections) ? availableSections : []);
      return;
    }

    // Filter sections by name - ensure availableSections is an array
    if (Array.isArray(availableSections)) {
      const filtered = availableSections.filter(section =>
        section.name && section.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSections(filtered);
    } else {
      console.error('availableSections is not an array:', availableSections);
      setFilteredSections([]);
    }
  };

  // Handle section selection
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setFormData({ ...formData, Section: section.id });
    setSectionSearchTerm(section.name);
    setIsSectionDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Validate that all required fields are filled
      if (!formData.Sku || !formData.SerialNumber || !formData.Warehouse || !formData.Section) {
        throw new Error("Please fill in all required fields.");
      }

      // Submit the form data
      await checkInItem(formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Auto-dismiss success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      
      // Reset only serial number after successful submission to allow rapid check-ins
      setFormData({
        ...formData,
        SerialNumber: "",
      });
      
      // Focus on serial number field for next entry
      setTimeout(() => {
        const serialNumberInput = document.getElementById('SerialNumber');
        if (serialNumberInput) {
          serialNumberInput.focus();
        }
      }, 100);
      
    } catch (error) {
      console.error('Error checking in item:', error);
      setSubmitError(error.message || "Failed to check in item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdowns when clicking outside and handle keyboard shortcuts
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (warehouseDropdownRef.current && !warehouseDropdownRef.current.contains(event.target)) {
        setIsWarehouseDropdownOpen(false);
      }
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target)) {
        setIsSectionDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      // Ctrl/Cmd + Enter to submit form quickly
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (!isSubmitting && formData.Sku && formData.SerialNumber && formData.Warehouse && formData.Section) {
          handleSubmit(event);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (warehouseSearchTimeoutRef.current) {
        clearTimeout(warehouseSearchTimeoutRef.current);
      }
    };
  }, []);

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

        {/* Error Message */}
        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-red-800">{submitError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SKU Search Field */}
          <div className="space-y-2" ref={dropdownRef}>
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
              Product SKU
            </label>
            <div className="relative">
              <input
                type="text"
                id="Sku"
                name="Sku"
                required
                className="w-full px-4 py-3 pr-10 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
                placeholder="Search for product by SKU..."
                value={searchTerm}
                onChange={(e) => handleSkuSearch(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                autoComplete="off"
              />
              
              {/* Search/Loading Icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isSearching ? (
                  <svg className="w-5 h-5 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>

              {/* Dropdown Results */}
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-accent-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {searchTerm.length < 2 ? (
                    <div className="px-4 py-3 text-sm text-accent-500">
                      Type at least 2 characters to search...
                    </div>
                  ) : isSearching ? (
                    <div className="px-4 py-3 text-sm text-accent-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="px-4 py-3 hover:bg-accent-50 cursor-pointer border-b border-accent-100 last:border-b-0 transition-colors duration-150"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-accent-800">{product.sku}</div>
                            <div className="text-sm text-accent-600">{product.name}</div>
                            {product.description && (
                              <div className="text-xs text-accent-500 mt-1">{product.description}</div>
                            )}
                          </div>
                          <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-accent-500">
                      No products found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Selected Product Display */}
            {selectedProduct && (
              <div className="mt-2 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary-800">Selected Product:</div>
                    <div className="text-sm text-primary-700">{selectedProduct.name} ({selectedProduct.sku})</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      setSearchTerm("");
                      setFormData({ ...formData, Sku: "" });
                    }}
                    className="text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Serial Number Field */}
          <div className="space-y-2">
            <label
              htmlFor="SerialNumber"
              className="flex items-center justify-between text-sm font-semibold text-accent-700"
            >
              <div className="flex items-center">
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
              </div>
              {selectedProduct && selectedWarehouse && selectedSection && (
                <span className="text-xs text-primary-600 font-normal">
                  Ready for rapid check-ins
                </span>
              )}
            </label>
            <input
              type="text"
              id="SerialNumber"
              name="SerialNumber"
              required
              className="w-full px-4 py-3 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
              placeholder="Enter serial number (Ctrl+Enter to submit quickly)"
              value={formData.SerialNumber}
              onChange={handleChange}
            />
          </div>

          {/* Warehouse Search Field */}
          <div className="space-y-2" ref={warehouseDropdownRef}>
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Warehouse
            </label>
            <div className="relative">
              <input
                type="text"
                id="Warehouse"
                name="Warehouse"
                required
                className="w-full px-4 py-3 pr-10 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400"
                placeholder="Search for warehouse..."
                value={warehouseSearchTerm}
                onChange={(e) => handleWarehouseSearch(e.target.value)}
                onFocus={() => setIsWarehouseDropdownOpen(true)}
                autoComplete="off"
              />
              
              {/* Search/Loading Icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isWarehouseSearching ? (
                  <svg className="w-5 h-5 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>

              {/* Dropdown Results */}
              {isWarehouseDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-accent-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {warehouseSearchTerm.length < 2 ? (
                    <div className="px-4 py-3 text-sm text-accent-500">
                      Type at least 2 characters to search...
                    </div>
                  ) : isWarehouseSearching ? (
                    <div className="px-4 py-3 text-sm text-accent-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </div>
                  ) : warehouseSearchResults.length > 0 ? (
                    warehouseSearchResults.map((warehouse) => (
                      <div
                        key={warehouse.id}
                        className="px-4 py-3 hover:bg-accent-50 cursor-pointer border-b border-accent-100 last:border-b-0 transition-colors duration-150"
                        onClick={() => handleWarehouseSelect(warehouse)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-accent-800">{warehouse.name}</div>
                            {warehouse.location && (
                              <div className="text-sm text-accent-600">{warehouse.location}</div>
                            )}
                            {warehouse.description && (
                              <div className="text-xs text-accent-500 mt-1">{warehouse.description}</div>
                            )}
                          </div>
                          <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-accent-500">
                      No warehouses found matching "{warehouseSearchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Selected Warehouse Display */}
            {selectedWarehouse && (
              <div className="mt-2 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary-800">Selected Warehouse:</div>
                    <div className="text-sm text-primary-700">{selectedWarehouse.name}</div>
                    {selectedWarehouse.location && (
                      <div className="text-xs text-primary-600">{selectedWarehouse.location}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedWarehouse(null);
                      setWarehouseSearchTerm("");
                      setFormData({ ...formData, Warehouse: 0, Section: 0 });
                      setSelectedSection(null);
                      setSectionSearchTerm("");
                      setAvailableSections([]);
                      setFilteredSections([]);
                    }}
                    className="text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section Search Field */}
          <div className="space-y-2" ref={sectionDropdownRef}>
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Section
            </label>
            <div className="relative">
              <input
                type="text"
                id="Section"
                name="Section"
                required
                disabled={!selectedWarehouse}
                className={`w-full px-4 py-3 pr-10 rounded-xl border border-accent-200 bg-white/50 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 placeholder:text-accent-400 ${
                  !selectedWarehouse ? 'cursor-not-allowed opacity-60' : ''
                }`}
                placeholder={selectedWarehouse ? "Search for section..." : "Please select a warehouse first"}
                value={sectionSearchTerm}
                onChange={(e) => handleSectionSearch(e.target.value)}
                onFocus={() => selectedWarehouse && setIsSectionDropdownOpen(true)}
                autoComplete="off"
              />
              
              {/* Search/Loading Icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isSectionLoading ? (
                  <svg className="w-5 h-5 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : !selectedWarehouse ? (
                  <svg className="w-5 h-5 text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>

              {/* Dropdown Results */}
              {isSectionDropdownOpen && selectedWarehouse && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-accent-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {isSectionLoading ? (
                    <div className="px-4 py-3 text-sm text-accent-500 flex items-center">
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading sections...
                    </div>
                  ) : Array.isArray(filteredSections) && filteredSections.length > 0 ? (
                    filteredSections.map((section) => (
                      <div
                        key={section.id}
                        className="px-4 py-3 hover:bg-accent-50 cursor-pointer border-b border-accent-100 last:border-b-0 transition-colors duration-150"
                        onClick={() => handleSectionSelect(section)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-accent-800">{section.name}</div>
                            {section.description && (
                              <div className="text-sm text-accent-600">{section.description}</div>
                            )}
                            <div className="text-xs text-accent-500 mt-1">
                              {section.totalInventory || 0} items • {section.availableInventory || 0} available
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))
                  ) : !Array.isArray(availableSections) || availableSections.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-accent-500">
                      No sections available in this warehouse
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-accent-500">
                      No sections found matching "{sectionSearchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Selected Section Display */}
            {selectedSection && (
              <div className="mt-2 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary-800">Selected Section:</div>
                    <div className="text-sm text-primary-700">{selectedSection.name}</div>
                    {selectedSection.description && (
                      <div className="text-xs text-primary-600">{selectedSection.description}</div>
                    )}
                    <div className="text-xs text-primary-600 mt-1">
                      {selectedSection.totalInventory || 0} items • {selectedSection.availableInventory || 0} available
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSection(null);
                      setSectionSearchTerm("");
                      setFormData({ ...formData, Section: 0 });
                    }}
                    className="text-primary-600 hover:text-primary-800 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Warehouse Required Notice */}
            {!selectedWarehouse && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-yellow-800">Please select a warehouse first to view available sections</span>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-accent-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 text-accent-600 bg-accent-50 hover:bg-accent-100 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] border border-accent-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.Sku || !formData.SerialNumber || !formData.Warehouse || !formData.Section}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Checking in...</span>
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="Item checked in successfully! Ready for next item."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default CheckIn;
