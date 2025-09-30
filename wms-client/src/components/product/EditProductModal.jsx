import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProduct } from '../../utils/http/updates';

const EditProductModal = ({ isOpen, onClose, onDelete, product }) => {
  const { isAdmin } = useAuth();
  
  const [formData, setFormData] = useState({
    Sku: product.Sku,
    Name: product.Name,
    Description: product.Description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(product.id, formData);
    onClose();
  }

  if (!isOpen) return null;
  
  return (
    <motion.div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Sku">Sku</label>
          <input type="text" id="Sku" name="Sku" value={formData.Sku} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Name">Name</label>
          <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Description">Description</label>
          <textarea id="Description" name="Description" value={formData.Description} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Edit</button>
          <button type="button" onClick={onClose}>Cancel</button>
          {isAdmin && (
            <button type="button" onClick={onDelete}>Delete</button>
          )}
        </div>
      </form>
    </motion.div>
  )
}

export default EditProductModal;