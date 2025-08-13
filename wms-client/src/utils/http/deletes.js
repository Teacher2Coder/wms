import axios from 'axios';

const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`/api/item/${itemId}`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const deleteSection = async (sectionId) => {
  try {
    const response = await axios.delete(`/api/section/${sectionId}`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/api/product/${productId}`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const deleteWarehouse = async (warehouseId) => {
  try {
    const response = await axios.delete(`/api/warehouse/${warehouseId}`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}



export {
  deleteItem,
  deleteSection,
  deleteProduct,
  deleteWarehouse,
}