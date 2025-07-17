import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WarehouseCards from '../components/home/WarehouseCards';
import Overview from '../components/home/Overview';

const Home = () => {

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('/api/warehouse');
      setWarehouses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchWarehouses();
  }, [])
  
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

  return (
    <div className="min-h-screen gradient-bg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="container mx-auto px-4 py-12"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            variants={itemVarients}
            className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight"
          >
            Warehouse Management
          </motion.h1>
          <motion.p
            variants={itemVarients}
            className="text-xl text-accent-700 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Streamline your inventory operations with our comprehensive warehouse management system
          </motion.p>
          <motion.div
            variants={itemVarients}
            className="flex justify-center mb-12"
          >
            <img
              src="/WMS.svg"
              alt="WMS Logo"
              className="w-32 h-32 animate-float filter drop-shadow-lg"
            />
          </motion.div>
        </div>

        <WarehouseCards 
          itemVarients={itemVarients} 
          warehouses={warehouses} 
          loading={loading}
          containerVariants={containerVariants}
          cardVariants={cardVariants}
        />

        <Overview
          itemVarients={itemVarients}
          warehouses={warehouses}
          loading={loading}
        />
        
      </motion.div>
    </div>
  );
};

export default Home;
