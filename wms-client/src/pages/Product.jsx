import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProduct } from '../utils/http/gets';

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const product = await getProduct(id);
      setProduct(product);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);
  
  console.log(product);

  return (
    <div>
      <h1>Product</h1>
    </div>
  )
}

export default Product;