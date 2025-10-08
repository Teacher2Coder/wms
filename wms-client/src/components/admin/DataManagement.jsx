import { motion } from "framer-motion";
import {
  Database,
  RefreshCw,
  AlertTriangle,
  Download,
  Upload,
} from "lucide-react";
import AdminSection from "../shared/AdminSection";

const DataManagement = () => {
  return (
    <motion.div
      key="data"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <AdminSection
        title="Data Management"
        subtitle="Backup, restore, and database maintenance operations"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Backup & Restore
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-5 w-5 mr-2" />
                Create Full Backup
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Upload className="h-5 w-5 mr-2" />
                Restore from Backup
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Database Operations
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Database className="h-5 w-5 mr-2" />
                Run Migrations
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <RefreshCw className="h-5 w-5 mr-2" />
                Optimize Database
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Database operations can affect system
              performance. Schedule during maintenance windows when possible.
            </p>
          </div>
        </div>
      </AdminSection>
    </motion.div>
  );
};

export default DataManagement;
