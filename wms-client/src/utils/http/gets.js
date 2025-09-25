import axios from '../axios-config.js';

const getWarehouses = async () => {
  const response = await axios.get('/api/warehouse');
  return response.data;
}

const getWarehouse = async (warehouseId) => {
  const response = await axios.get(`/api/warehouse/${warehouseId}`);
  return response.data;
}

const searchWarehouses = async (name) => {
  const response = await axios.get(`/api/warehouse/search?name=${name}`);
  return response.data;
}

const getSections = async (warehouseId) => {
  const response = await axios.get(`/api/warehouse/${warehouseId}/section`);
  return response.data;
}

const getSection = async (warehouseId, sectionId) => {
  const response = await axios.get(`/api/warehouse/${warehouseId}/section/${sectionId}`);
  return response.data;
}

const getAllProducts = async () => {
  const response = await axios.get(`/api/product`);
  return response.data;
}

const getSectionProducts = async (sectionId) => {
  const response = await axios.get(`/api/section/${sectionId}/product`);
  return response.data;
}

const searchProducts = async (name) => {
  const response = await axios.get(`/api/product/search?name=${name}`);
  return response.data;
}

const getProduct = async (productId) => {
  const response = await axios.get(`/api/product/${productId}`);
  return response.data;
}

const getItems = async (productId) => {
  const response = await axios.get(`/api/product/${productId}/item`);
  return response.data;
}

const getItem = async (productId) => {
  const response = await axios.get(`/api/product/${productId}/item`);
  return response.data;
}

const searchItems = async (serialNumber) => {
  const response = await axios.get(`/api/item/search?serialNumber=${serialNumber}`);
  return response.data;
}

const getOrders = async () => {
  const response = await axios.get(`/api/order`);
  return response.data;
}

const getOrder = async (orderId) => {
  const response = await axios.get(`/api/order/${orderId}`);
  return response.data;
}

const searchOrders = async (number) => {
  const response = await axios.get(`/api/order/search?number=${number}`);
  return response.data;
}

const getAction = async (actionId) => {
  const response = await axios.get(`/api/actions/${actionId}`);
  return response.data;
}

const getAllActions = async () => {
  const response = await axios.get(`/api/actions`);
  return response.data;
}

const getUserActions = async (userId) => {
  const response = await axios.get(`/api/actions/user/${userId}`);
  return response.data;
}

const getMyActions = async () => {
  const response = await axios.get(`/api/actions/my-actions`);
  return response.data;
}

const getUser = async (userId) => {
  const response = await axios.get(`/api/auth/users/${userId}`);
  return response.data;
}

export {
  getWarehouses,
  getWarehouse,
  searchWarehouses,
  getSections,
  getSection,
  getAllProducts,
  getSectionProducts,
  searchProducts,
  getProduct,
  getItems,
  getItem,
  searchItems,
  getOrders,
  getOrder,
  searchOrders,
  getAction,
  getAllActions,
  getUserActions,
  getMyActions,
  getUser,
}