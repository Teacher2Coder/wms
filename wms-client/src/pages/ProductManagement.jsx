import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../utils/http/gets';
import Loading from '../components/Loading';
import ProductsOverview from '../components/product-manage/ProductsOverview';
import ProductList from '../components/product-manage/ProductList';

const Product = () => {

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <motion.div
        variants={containerVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-accent-800 mb-4">Products</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        <div className="align-center">
          <ProductsOverview
            products={products}
            variants={itemVarients}
            onRefresh={fetchProducts}
          />
        </div>
      </motion.div>
      <ProductList
        products={products}
        variants={itemVarients}
        onRefresh={fetchProducts}
      />
    </div>
  )
}

export default Product;