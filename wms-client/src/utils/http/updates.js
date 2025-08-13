import axios from 'axios';

const updateItem = async (itemId, item) => {
  try {
    const response = await axios.put(`/api/item/${itemId}`, item);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const updateSection = async (sectionId, section) => {
  try {
    const response = await axios.put(`/api/section/${sectionId}`, section);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}


const updateProduct = async (productId, product) => {
  try {
    const response = await axios.put(`/api/product/${productId}`, product);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}


const updateWarehouse = async (warehouseId, warehouse) => {
  try {
    const response = await axios.put(`/api/warehouse/${warehouseId}`, warehouse);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}


export {
  updateItem,
  updateSection,
  updateProduct,
  updateWarehouse,
}