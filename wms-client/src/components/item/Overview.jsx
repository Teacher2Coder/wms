import { motion } from 'framer-motion';
import OverviewHeader from '../shared/OverviewHeader';

/**
 * Item Overview Component
 * Can be used for displaying item-specific overview information
 */
const Overview = ({ item, variants }) => {
  if (!item) {
    return (
      <motion.div 
        className="w-full max-w-4xl mx-auto p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Item Selected</h3>
          <p className="text-gray-500">Select an item to view its overview.</p>
        </div>
      </motion.div>
    );
  }

  const itemIcon = (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );

  const infoItems = [
    {
      label: 'Serial Number',
      value: item.serialNumber,
      icon: (
        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      )
    },
    {
      label: 'Product',
      value: item.productName,
      icon: (
        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      label: 'Status',
      value: item.status,
      icon: (
        <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <OverviewHeader
        title={`Item ${item.serialNumber}`}
        subtitle="Item Overview"
        icon={itemIcon}
        variants={variants}
        infoItems={infoItems}
        showSettings={false}
      />
    </div>
  );
};

export default Overview;