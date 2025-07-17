import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Warehouse = () => {
  const { id } = useParams();

  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`/api/warehouse/${id}`);
      setWarehouse(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWarehouse();
  }, [id]);
  
  console.log(warehouse);
  
  return (
    <div>
      <h1>Warehouse {id}</h1>
    </div>
  )
}

export default Warehouse;