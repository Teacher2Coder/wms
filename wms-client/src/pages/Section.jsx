import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSection } from '../utils/http/gets';
import SectionOverview from '../components/section/SectionOverview';

const Section = () => {

  const { warehouseId, sectionId } = useParams();
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSection = async () => {
    try {
      const section = await getSection(warehouseId, sectionId);
      setSection(section);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching section:', error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchSection();
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-accent-800 mb-4">Section: {section.name}</h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        <div className="align-center">
          <SectionOverview section={section} warehouseId={warehouseId} loading={loading} />
        </div>
      </motion.div>
    </div>
  );
};

export default Section;