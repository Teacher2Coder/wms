import { motion } from "framer-motion";
import { Clock, User, AlertCircle, CheckCircle, XCircle } from "lucide-react";

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionTypeIcon = (actionType) => {
    switch (actionType) {
      case 'CREATE':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'UPDATE':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'DELETE':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'VIEW':
        return <User className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getActionTypeColor = (actionType) => {
    switch (actionType) {
      case 'CREATE':
        return 'bg-green-100 text-green-800';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      case 'VIEW':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <motion.div 
              key={action.id} 
              variants={itemVariants} 
              className="bg-gray-50 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getActionTypeIcon(action.actionType)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
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
                    </div>
                    
                    {action.description && (
                      <p className="text-sm text-gray-700 mb-2">
                        {action.description}
                      </p>
                    )}
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(action.timestamp)}
                      {!action.isSuccessful && (
                        <span className="ml-3 text-red-600 font-medium">
                          • Failed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Actions;