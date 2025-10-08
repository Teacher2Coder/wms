import { motion } from "framer-motion";
import {
  Users,
  Warehouse,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import AdminSection from "../shared/AdminSection";
import AdminCard from "../shared/AdminCard";

const Analytics = ({ stats }) => {
  const analyticsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="h-8 w-8" />,
      color: "blue"
    },
    {
      title: "Warehouses", 
      value: stats.totalWarehouses,
      icon: <Warehouse className="h-8 w-8" />,
      color: "green"
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <Package className="h-8 w-8" />,
      color: "purple"
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart className="h-8 w-8" />,
      color: "orange"
    }
  ];

  return (
    <motion.div
      key="analytics"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <AdminSection
        title="Advanced Analytics"
        subtitle="System-wide metrics and performance indicators"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {analyticsCards.map((card, index) => (
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

        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>Advanced analytics dashboard would be implemented here</p>
          <p className="text-sm">Charts, graphs, and detailed system metrics</p>
        </div>
      </AdminSection>
    </motion.div>
  );
};

export default Analytics;
