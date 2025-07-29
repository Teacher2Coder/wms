import axios from 'axios';

const deleteItem = async (itemId) => {
  const response = await axios.delete(`/api/item/${itemId}`);
  if (response.status === 204) {
    return true;
  }
  return false;
}

const deleteSection = async (sectionId) => {
  const response = await axios.delete(`/api/section/${sectionId}`);
  if (response.status === 204) {
    return true;
  }
  return false;
}

const deleteProduct = async (productId) => {
  const response = await axios.delete(`/api/product/${productId}`);
  if (response.status === 204) {
    return true;
  }
  return false;
}

const deleteWarehouse = async (warehouseId) => {
  const response = await axios.delete(`/api/warehouse/${warehouseId}`);
  if (response.status === 204) {
    return true;
  }
  return false;
}



export {
  deleteItem,
  deleteSection,
  deleteProduct,
  deleteWarehouse,
}