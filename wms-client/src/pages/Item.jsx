import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItem } from '../utils/http/api';

const Item = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
      const item = await getItem(id);
      setItem(item);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching item:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [id]);
  
  console.log(item);

  return (
    <div>
      <h1>Item</h1>
    </div>
  )
}

export default Item;