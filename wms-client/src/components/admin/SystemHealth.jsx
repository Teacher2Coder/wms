import { motion } from "framer-motion";
import { Server, Database, Activity, Download } from "lucide-react";

const SystemHealth = ({ stats }) => {
  return (
    <motion.div
      key="system"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          System Health Monitor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">API Status</p>
                <p className="text-2xl font-bold">Online</p>
              </div>
              <Server className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Database</p>
                <p className="text-2xl font-bold">Connected</p>
              </div>
              <Database className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Uptime</p>
                <p className="text-2xl font-bold">{stats.systemUptime}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Last Backup</p>
                <p className="text-xl font-bold">Today</p>
              </div>
              <Download className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="text-center py-8 text-gray-500">
          <Server className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>System monitoring charts and logs would be displayed here</p>
          <p className="text-sm">Real-time performance metrics and alerts</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemHealth;
