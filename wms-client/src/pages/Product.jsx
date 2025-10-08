import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProduct } from '../utils/http/api';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import GoBack from '../components/GoBack';
import ItemList from '../components/product/ProductItemList';

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

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <NotFound />;
  }

  const items = product.items;

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  // Calculate item statistics
  const totalItems = items.length;
  const availableItems = items.filter(item => item.status === 'Available').length;
  const reservedItems = items.filter(item => item.status === 'Reserved').length;
  const inTransitItems = items.filter(item => item.status === 'InTransit').length;
  const damagedItems = items.filter(item => item.status === 'Damaged').length;
  const expiredItems = items.filter(item => item.status === 'Expired').length;

  return (
    <motion.div 
      className="min-h-screen gradient-bg"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <GoBack />
        
        {/* Product Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl border border-accent-100 p-8 mb-8 mt-6"
          variants={headerVariants}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <motion.h1 
                className="text-4xl font-bold text-accent-800 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {product.name}
              </motion.h1>
              <motion.div 
                className="flex items-center gap-4 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 border border-primary-200">
                  SKU: {product.sku}
                </span>
              </motion.div>
              <motion.p 
                className="text-accent-600 text-lg leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {product.description}
              </motion.p>
            </div>
            
            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:min-w-[400px]"
              variants={statsVariants}
            >
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4 text-center border border-accent-200">
                <div className="text-2xl font-bold text-accent-800">{totalItems}</div>
                <div className="text-xs font-medium text-accent-600 uppercase tracking-wide">Total</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-700">{availableItems}</div>
                <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Available</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{reservedItems}</div>
                <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">Reserved</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-700">{inTransitItems}</div>
                <div className="text-xs font-medium text-yellow-600 uppercase tracking-wide">In Transit</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-700">{damagedItems}</div>
                <div className="text-xs font-medium text-red-600 uppercase tracking-wide">Damaged</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200">
                <div className="text-2xl font-bold text-orange-700">{expiredItems}</div>
                <div className="text-xs font-medium text-orange-600 uppercase tracking-wide">Expired</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Items Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ItemList items={items} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Product;