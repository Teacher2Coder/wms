import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Overview from '../components/warehouse/Overview';
import Sections from '../components/warehouse/Sections';
import { getWarehouse } from '../utils/http/gets';

const Warehouse = () => {
  const { id } = useParams();

  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWarehouse = async () => {
    try {
      const warehouse = await getWarehouse(id);
      setWarehouse(warehouse);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWarehouse();
  }, [id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-accent-800 mb-4">Warehouse: {warehouse.name}</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        <div className="align-center">
          <Overview warehouse={warehouse} loading={loading} />
        </div>
      </motion.div>
      <Sections sections={warehouse.sections} loading={loading} />
    </div>
  )
}

export default Warehouse;