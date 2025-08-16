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

export {
  getWarehouses,
  getWarehouse,
  getSections,
  getSection,
  getAllProducts,
  getSectionProducts,
  searchProducts,
  getProduct,
  getItems,
  getItem,
}