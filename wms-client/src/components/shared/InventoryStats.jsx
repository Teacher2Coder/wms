/**
 * Inventory Statistics Utility
 * Generates standardized inventory stats for warehouses and sections
 */

// Standard inventory icons
const icons = {
  sections: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  totalInventory: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  available: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  reserved: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  inTransit: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  damaged: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  expired: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  outOfStock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  )
};

/**
 * Generate primary inventory stats (Total, Available, Reserved)
 * Used for both warehouses and sections
 */
export const getPrimaryInventoryStats = (data) => [
  {
    key: 'totalInventory',
    title: 'Total Inventory',
    value: data.totalInventory,
    icon: icons.totalInventory,
    color: 'green'
  },
  {
    key: 'availableInventory',
    title: 'Available',
    value: data.availableInventory,
    icon: icons.available,
    color: 'emerald'
  },
  {
    key: 'reservedInventory',
    title: 'Reserved',
    value: data.reservedInventory,
    icon: icons.reserved,
    color: 'yellow'
  }
];

/**
 * Generate secondary inventory stats (In Transit, Damaged, Expired, Out of Stock)
 * Used for both warehouses and sections
 */
export const getSecondaryInventoryStats = (data) => [
  {
    key: 'inTransitInventory',
    title: 'In Transit',
    value: data.inTransitInventory,
    icon: icons.inTransit,
    color: 'purple'
  },
  {
    key: 'damagedInventory',
    title: 'Damaged',
    value: data.damagedInventory,
    icon: icons.damaged,
    color: 'red'
  },
  {
    key: 'expiredInventory',
    title: 'Expired',
    value: data.expiredInventory,
    icon: icons.expired,
    color: 'orange'
  },
  {
    key: 'outOfStockInventory',
    title: 'Out of Stock',
    value: data.outOfStockInventory,
    icon: icons.outOfStock,
    color: 'gray'
  }
];

/**
 * Generate warehouse-specific stats (includes sections count)
 */
export const getWarehouseStats = (warehouse) => {
  const primaryStats = getPrimaryInventoryStats(warehouse);
  const secondaryStats = getSecondaryInventoryStats(warehouse);
  
  // Add sections count as first stat for warehouses
  const sectionsStats = {
    key: 'sections',
    title: 'Sections',
    value: warehouse.sections?.length || 0,
    icon: icons.sections,
    color: 'blue'
  };

  return {
    primary: [sectionsStats, ...primaryStats],
    secondary: secondaryStats
  };
};

/**
 * Generate section-specific stats
 */
export const getSectionStats = (section) => ({
  primary: getPrimaryInventoryStats(section),
  secondary: getSecondaryInventoryStats(section)
});

export default {
  getPrimaryInventoryStats,
  getSecondaryInventoryStats,
  getWarehouseStats,
  getSectionStats,
  icons
};
