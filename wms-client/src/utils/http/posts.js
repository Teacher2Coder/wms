import axios from '../axios-config.js';

const createItem = async (item) => {
  try {
    const response = await axios.post('/api/item', item);
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const createSection = async (warehouseId, section) => {
  try {
    const response = await axios.post(`/api/warehouse/${warehouseId}/section`, section);
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const createProduct = async (product) => {
  try {
    const response = await axios.post('/api/product', product);
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const createWarehouse = async (warehouse) => {
  try {
    const response = await axios.post('/api/warehouse', warehouse);
    if (response.status === 201) {
      return response.data;
    }
    console.error('Unexpected response status:', response.status);
    return null;
  } catch (err) {
    console.error('Error creating warehouse:', err);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
    }
    return null;
  }
}

export {
  createItem,
  createSection,
  createProduct,
  createWarehouse,
}