import StatsCard from './StatsCard';

/**
 * Reusable Stats Grid Component
 * Displays inventory statistics in a responsive grid
 */
const StatsGrid = ({ stats, className = '' }) => {
  if (!stats || stats.length === 0) return null;

  // Determine grid columns based on number of stats
  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <div className={`grid ${getGridCols(stats.length)} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.key || index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
