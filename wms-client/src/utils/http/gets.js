import axios from 'axios';

const getWarehouses = async () => {
  const response = await axios.get('/api/warehouse');
  return response.data;
}

const getWarehouse = async (warehouseId) => {
  const response = await axios.get(`/api/warehouse/${warehouseId}`);
  return response.data;
}

const getSections = async (warehouseId) => {
  const response = await axios.get(`/api/warehouse/${warehouseId}/section`);
  return response.data;
}

const getSection = async (sectionId) => {
  const response = await axios.get(`/api/section/${sectionId}`);
  return response.data;
}

const getProducts = async (sectionId) => {
  const response = await axios.get(`/api/section/${sectionId}/product`);
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

export {
  getWarehouses,
  getWarehouse,
  getSections,
  getSection,
  getProducts,
  getProduct,
  getItems,
  getItem,
}