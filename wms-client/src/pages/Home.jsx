import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import WarehouseCards from '../components/home/WarehouseCards';
import Overview from '../components/home/Overview';
import { getWarehouses } from '../utils/http/gets';

const Home = () => {

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWarehouses = async () => {
    try {
      const warehouses = await getWarehouses();
      setWarehouses(warehouses);
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
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    }
  };

  const itemVarients = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05 // Subtle stagger for table rows
      },
    }),
  };

  if (loading) {
    return <Loading />
  }

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
        </div>

        <WarehouseCards 
          itemVarients={itemVarients} 
          warehouses={warehouses} 
          containerVariants={containerVariants}
          cardVariants={cardVariants}
        />

        <Overview
          itemVarients={itemVarients}
          warehouses={warehouses}
        />
        
      </motion.div>
    </div>
  );
};

export default Home;
