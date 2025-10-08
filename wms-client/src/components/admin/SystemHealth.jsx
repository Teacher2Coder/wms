import { motion } from "framer-motion";
import { Server, Database, Activity, Download } from "lucide-react";
import AdminSection from "../shared/AdminSection";
import AdminCard from "../shared/AdminCard";

const SystemHealth = ({ stats }) => {
  const healthCards = [
    {
      title: "API Status",
      value: "Online",
      icon: <Server className="h-8 w-8" />,
      color: "green"
    },
    {
      title: "Database",
      value: "Connected",
      icon: <Database className="h-8 w-8" />,
      color: "blue"
    },
    {
      title: "Uptime",
      value: stats.systemUptime,
      icon: <Activity className="h-8 w-8" />,
      color: "purple"
    },
    {
      title: "Last Backup",
      value: "Today",
      icon: <Download className="h-8 w-8" />,
      color: "orange"
    }
  ];

  return (
    <motion.div
      key="system"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <AdminSection
        title="System Health Monitor"
        subtitle="Real-time system status and performance metrics"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AdminCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                variant="gradient"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center py-8 text-gray-500">
          <Server className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>System monitoring charts and logs would be displayed here</p>
          <p className="text-sm">Real-time performance metrics and alerts</p>
        </div>
      </AdminSection>
    </motion.div>
  );
};

export default SystemHealth;
