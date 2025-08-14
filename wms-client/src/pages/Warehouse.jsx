import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WarehouseOverview from '../components/warehouse/WarehouseOverview';
import Sections from '../components/warehouse/Sections';
import { getWarehouse } from '../utils/http/gets';
import Loading from '../components/Loading';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delay: 0.3,
      },
    }
  };

  const itemVarients = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  
  if (loading) {
    return <Loading />;
  }

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-accent-800 mb-4">Warehouse: {warehouse.name}</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        <div className="align-center">
          <WarehouseOverview warehouse={warehouse} variants={itemVarients} />
        </div>
      </motion.div>
      <Sections sections={warehouse.sections} warehouseId={id} variants={itemVarients} />
    </div>
  )
}

export default Warehouse;