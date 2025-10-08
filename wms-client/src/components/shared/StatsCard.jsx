/**
 * Reusable Stats Card Component
 * Used for displaying inventory statistics with icons and values
 */
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    emerald: 'from-emerald-500 to-emerald-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
    gray: 'from-gray-500 to-gray-600'
  };

  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-md`}>
          <span className="w-6 h-6 text-white">
            {icon}
          </span>
        </div>
      </div>
      <div className="text-3xl font-bold text-accent-800 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-sm font-medium text-accent-500 uppercase tracking-wide">
        {title}
      </div>
    </div>
  );
};

export default StatsCard;
