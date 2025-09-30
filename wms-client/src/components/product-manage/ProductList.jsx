import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CreateProductModal from "./CreateProductModal";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import handleSmoothScroll from "../../utils/handleSmoothScroll";

const ProductList = ({ products, variants, onRefresh }) => {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const { canManage } = useAuth(); // Only Admin and Manager can create products
  
  return (
    <div>
      {(!products || products.length === 0) && (
        <motion.div 
          variants={variants}
          className="text-center py-20"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-glow">
            <div className="w-16 h-16 mx-auto mb-6 bg-accent-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-accent-800 mb-2">No Products Found</h3>
            <p className="text-accent-600">
              {canManage ? 'Add your first product to get started.' : 'No products are currently available.'}
            </p>
            {canManage && (
              <button 
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 mt-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg" 
                onClick={() => setIsCreateProductModalOpen(true)}
              >
                Create a Product
              </button>
            )}
          </div>
        </motion.div>
      )}
      {products && products.length > 0 && (
        <motion.div 
          variants={variants}
          className="text-center py-20"
        >
          <h2 className="text-2xl font-bold text-accent-800 mb-4">Products</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  to={`/product/${product.id}`} 
                  className="block group"
                  onClick={() => handleSmoothScroll()}
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-primary-200 h-full">
                    {/* Header with icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">Product</div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-accent-800 group-hover:text-primary-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <h3 className="text-xl font-bold text-accent-800 group-hover:text-primary-600 transition-colors duration-200">
                        SKU: {product.sku}
                      </h3>
                      <p className="text-accent-600 text-sm leading-relaxed line-clamp-2">
                        {product.description || 'No description available'}
                      </p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-accent-100">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent-800">
                            {product.items ? product.items.length : 0}
                          </div>
                          <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">
                            Total Items
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">
                            {product.items ? product.items.filter(item => item.status === 0).length : 0}
                          </div>
                          <div className="text-xs font-medium text-accent-500 uppercase tracking-wide">
                            Available
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-primary-500 text-sm font-medium">View Details</span>
                      <svg className="w-4 h-4 ml-1 text-primary-500 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      <CreateProductModal 
        isOpen={isCreateProductModalOpen} 
        onClose={() => setIsCreateProductModalOpen(false)} 
        onSuccess={onRefresh}
      />
    </div>
  )
}

export default ProductList;