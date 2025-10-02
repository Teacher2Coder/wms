import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSection } from '../utils/http/gets';
import SectionOverview from '../components/section/SectionOverview';
import Loading from '../components/Loading';
import GoBack from '../components/GoBack';
import ItemList from '../components/item/ItemList';

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

  const items = section.items;

  return (
    <div className="min-h-screen gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-accent-800">Section: {section.name}</h1>
          <div className="flex justify-start sm:justify-end">
            <GoBack />
          </div>
        </div>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-12"></div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="align-center"
        >
          <SectionOverview 
            section={section} 
            warehouseId={warehouseId} 
            variants={cardVariants} 
          />
        </motion.div>
      </motion.div>
      <ItemList
        items={items}
        warehouseId={warehouseId}
        sectionId={sectionId}
      />
    </div>
  );
};

export default Section;