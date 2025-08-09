import axios from 'axios';

const createItem = async (item) => {
  const response = await axios.post('/api/item', item);
  if (response.status === 201) {
    return true;
  }
  return false;
}

const createSection = async (warehouseId, section) => {
  const response = await axios.post(`/api/warehouse/${warehouseId}/section`, section);
  if (response.status === 201) {
    return true;
  }
  return false;
}

const createProduct = async (product) => {
  const response = await axios.post('/api/product', product);
  if (response.status === 201) {
    return true;
  }
  return false;
}

const createWarehouse = async (warehouse) => {
  const response = await axios.post('/api/warehouse', warehouse);
  if (response.status === 201) {
    return true;
  }
  return false;
}

export {
  createItem,
  createSection,
  createProduct,
  createWarehouse,
}