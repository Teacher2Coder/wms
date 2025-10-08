import { motion } from "framer-motion";
import { Shield, Lock, AlertTriangle } from "lucide-react";
import ActionSort from "./ActionSort";
import AdminSection from "../shared/AdminSection";
import AdminCard from "../shared/AdminCard";

const Security = ({ stats }) => {
  const securityCards = [
    {
      title: "Failed Login Attempts",
      value: 0,
      icon: <AlertTriangle className="h-8 w-8" />,
      color: "red"
    },
    {
      title: "Active Sessions",
      value: stats.activeUsers,
      icon: <Shield className="h-8 w-8" />,
      color: "green"
    }
  ];

  return (
    <div>
      <motion.div
        key="security"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <AdminSection
          title="Security Center"
          subtitle="Monitor security events and system protection"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {securityCards.map((card, index) => (
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

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">JWT Authentication</p>
                  <p className="text-sm text-gray-600">
                    Token-based authentication enabled
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Password Encryption</p>
                  <p className="text-sm text-gray-600">
                    BCrypt hashing with salt rounds
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Secure
              </span>
            </div>
          </div>
        </AdminSection>
        
        <ActionSort />
      </motion.div>
    </div>
  );
};

export default Security;
