import axios from '../axios-config.js';

const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`/api/item/${itemId}`);
    if (response.status === 204) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const deleteSection = async (warehouseId, sectionId) => {
  try {
    const response = await axios.delete(`/api/warehouse/${warehouseId}/section/${sectionId}`);
    if (response.status === 204) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/api/product/${productId}`);
    if (response.status === 204) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const deleteWarehouse = async (warehouseId) => {
  try {
    const response = await axios.delete(`/api/warehouse/${warehouseId}`);
    if (response.status === 204) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}



export {
  deleteItem,
  deleteSection,
  deleteProduct,
  deleteWarehouse,
}