import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import handleSmoothScroll from '../utils/handleSmoothScroll';
import GoBack from './GoBack';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border border-white/30">
            <svg className="w-16 h-16 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.512-.901-6.13-2.379l-.821 5.985A1 1 0 006.05 20h11.9a1 1 0 001.001-1.394l-.821-5.985A7.962 7.962 0 0112 15z" />
            </svg>
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-accent-600 leading-relaxed mb-6">
            We couldn't find the page you were looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              onClick={() => handleSmoothScroll()}
              className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Go Home</span>
            </Link>
            
            <GoBack />
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-accent-500 text-sm">
            If you think this is an error, please contact support or try refreshing the page.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound;