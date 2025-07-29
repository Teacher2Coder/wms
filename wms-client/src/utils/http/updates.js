import axios from 'axios';

const updateItem = async (itemId, item) => {
  const response = await axios.put(`/api/item/${itemId}`, item);
  if (response.status === 200) {
    return true;
  }
  return false;
}

const updateSection = async (sectionId, section) => {
  const response = await axios.put(`/api/section/${sectionId}`, section);
  if (response.status === 200) {
    return true;
  }
  return false;
}


const updateProduct = async (productId, product) => {
  const response = await axios.put(`/api/product/${productId}`, product);
  if (response.status === 200) {
    return true;
  }
  return false;
}


const updateWarehouse = async (warehouseId, warehouse) => {
  const response = await axios.put(`/api/warehouse/${warehouseId}`, warehouse);
  if (response.status === 200) {
    return true;
  }
  return false;
}


export {
  updateItem,
  updateSection,
  updateProduct,
  updateWarehouse,
}