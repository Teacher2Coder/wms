import { motion } from 'framer-motion'
import NotFound from '../components/NotFound';

const Error = () => {
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

  return (
    <div className="min-h-screen gradient-bg">
      <NotFound />
    </div>
  );
};

export default Error;
