import { motion } from "framer-motion";
import { Shield, Lock, AlertTriangle } from "lucide-react";

const Security = ({ stats }) => {
  return (
    <motion.div
      key="security"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Security Center
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Failed Login Attempts</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Sessions</p>
                <p className="text-3xl font-bold">{stats.activeUsers}</p>
              </div>
              <Shield className="h-8 w-8 text-green-200" />
            </div>
          </div>
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
      </div>
    </motion.div>
  );
};

export default Security;
