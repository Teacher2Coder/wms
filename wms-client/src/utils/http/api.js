import axios from '../axios-config.js';

/**
 * Generic HTTP request handler with consistent error handling
 * @param {string} method - HTTP method (get, post, put, delete)
 * @param {string} url - API endpoint (without /api prefix)
 * @param {Object} data - Request body data (for POST/PUT)
 * @param {Object} config - Additional axios config
 * @returns {Promise} - Response data or throws error
 */

const request = async (method, url, data = null, config = {}) => {
  try {
    const fullUrl = url.startsWith('/api') ? url : `/api${url}`;
    const response = await axios[method](fullUrl, data, config);
    return response.data;
  } catch (error) {
    console.error(`API Error [${method.toUpperCase()} ${url}]:`, error);
    
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data);
    }
    throw error;
  }
};

// Generic HTTP methods
const get = (url, config) => request('get', url, null, config);
const post = (url, data, config) => request('post', url, data, config);
const put = (url, data, config) => request('put', url, data, config);
const del = (url, config) => request('delete', url, null, config);

// Warehouse operations
const getWarehouses = () => get('/warehouse');
const getWarehouse = (warehouseId) => get(`/warehouse/${warehouseId}`);
const searchWarehouses = (name) => get(`/warehouse/search?name=${encodeURIComponent(name)}`);
const createWarehouse = (warehouse) => post('/warehouse', warehouse);
const updateWarehouse = (warehouseId, warehouse) => put(`/warehouse/${warehouseId}`, warehouse);
const deleteWarehouse = (warehouseId) => del(`/warehouse/${warehouseId}`);

// Section operations
const getSections = (warehouseId) => get(`/warehouse/${warehouseId}/section`);
const getSection = (warehouseId, sectionId) => get(`/warehouse/${warehouseId}/section/${sectionId}`);
const createSection = (warehouseId, section) => post(`/warehouse/${warehouseId}/section`, section);
const updateSection = (warehouseId, sectionId, section) => put(`/warehouse/${warehouseId}/section/${sectionId}`, section);
const deleteSection = (warehouseId, sectionId) => del(`/warehouse/${warehouseId}/section/${sectionId}`);

// Product operations
const getAllProducts = () => get('/product');
const getProduct = (productId) => get(`/product/${productId}`);
const getSectionProducts = (sectionId) => get(`/section/${sectionId}/product`);
const searchProducts = (name) => get(`/product/search?name=${encodeURIComponent(name)}`);
const searchProductsBySku = (sku) => get(`/product/search/sku?sku=${encodeURIComponent(sku)}`);
const createProduct = (product) => post('/product', product);
const updateProduct = (productId, product) => put(`/product/${productId}`, product);
const deleteProduct = (productId) => del(`/product/${productId}`);

// Item operations
const getItems = (productId) => get(`/product/${productId}/item`);
const getItem = (productId) => get(`/product/${productId}/item`);
const searchItems = (serialNumber) => get(`/item/search?serialNumber=${encodeURIComponent(serialNumber)}`);
const createItem = (item) => post('/item', item);
const updateItem = (itemId, item) => put(`/item/${itemId}`, item);
const deleteItem = (itemId) => del(`/item/${itemId}`);
const checkInItem = (itemData) => post('/item/checkin', itemData);

// Order operations
const getOrders = () => get('/order');
const getOrder = (orderId) => get(`/order/${orderId}`);
const searchOrders = (number) => get(`/order/search?number=${encodeURIComponent(number)}`);
const createOrder = (orderData) => post('/order', orderData);

// Action operations
const getAllActions = () => get('/actions');
const getAction = (actionId) => get(`/actions/${actionId}`);
const getUserActions = (userId) => get(`/actions/user/${userId}`);
const getMyActions = () => get('/actions/my-actions');

// User operations
const getUser = (userId) => get(`/auth/users/${userId}`);

export {
  // Generic HTTP methods
  get,
  post,
  put,
  del,
  
  // Warehouse API
  getWarehouses,
  getWarehouse,
  searchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  
  // Section API
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  
  // Product API
  getAllProducts,
  getProduct,
  getSectionProducts,
  searchProducts,
  searchProductsBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  
  // Item API
  getItems,
  getItem,
  searchItems,
  createItem,
  updateItem,
  deleteItem,
  checkInItem,
  
  // Order API
  getOrders,
  getOrder,
  searchOrders,
  createOrder,
  
  // Action API
  getAllActions,
  getAction,
  getUserActions,
  getMyActions,
  
  // User API
  getUser,
};
