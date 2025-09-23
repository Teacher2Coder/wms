import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, User, AlertCircle, CheckCircle, XCircle, Shield, Globe } from "lucide-react";
import { getActionTypeIcon, getActionTypeColor, getUserRoleColor } from "../../utils/actionHelpers.jsx";
import { formatDate } from "../../utils/helpers";
import handleSmoothScroll from "../../utils/handleSmoothScroll";

const Actions = ({ actions, loading, error }) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading your activity...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-8 text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && actions.length === 0 && (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Clock className="h-5 w-5 mr-2" />
          <span>No recent activity found</span>
        </div>
      )}

      {!loading && !error && actions.length > 0 && (
        <div className="space-y-4">
          {actions.map((action) => (
            <Link 
              to={`/action/${action.id}`}
              key={action.id}
              onClick={() => handleSmoothScroll()}
            >
              <motion.div  
                variants={itemVariants} 
                className="bg-gray-50 rounded-lg border border-gray-200 p-4 m-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getActionTypeIcon(action.actionType)}
                    </div>
                    <div className="flex-1">
                      {/* Action Type and Entity Info */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionTypeColor(action.actionType)}`}>
                          {action.actionType}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {action.entityType}
                        </span>
                        {action.entityName && (
                          <span className="text-sm text-gray-600">
                            • {action.entityName}
                          </span>
                        )}
                        {action.entityId && (
                          <span className="text-xs text-gray-500">
                            (ID: {action.entityId})
                          </span>
                        )}
                      </div>

                      {/* User Information */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {action.username || 'Unknown User'}
                          </span>
                          {action.userRole && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getUserRoleColor(action.userRole)}`}>
                              <Shield className="h-3 w-3 mr-1" />
                              {action.userRole}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Description */}
                      {action.description && (
                        <p className="text-sm text-gray-700 mb-3">
                          {action.description}
                        </p>
                      )}
                      
                      {/* Timestamp and Status */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(action.timestamp)}
                        </div>
                        <div className="flex items-center space-x-2">
                          {action.isSuccessful ? (
                            <span className="text-green-600 font-medium flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Success
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium flex items-center">
                              <XCircle className="h-3 w-3 mr-1" />
                              Failed
                              {action.errorMessage && (
                                <span className="ml-2 text-red-500" title={action.errorMessage}>
                                  (Error)
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Actions;