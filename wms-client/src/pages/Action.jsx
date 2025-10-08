import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAction } from '../utils/http/api';
import { motion } from 'framer-motion';
import { User, CheckCircle, XCircle, Shield, Globe, Calendar, Monitor } from "lucide-react";
import { getActionTypeIcon, getActionTypeColor, getUserRoleColor } from '../utils/componentHelpers';
import { formatDate } from '../utils/helpers';
import Loading from '../components/Loading';
import GoBack from '../components/GoBack';

const Action = () => {
  const { id } = useParams();
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const fetchedAction = await getAction(id);
        setAction(fetchedAction);
      } catch (error) {
        console.error('Error fetching action:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAction();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <Loading />;
  }

  if (!action) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <GoBack />
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Action Not Found</h2>
            <p className="text-gray-600">The requested action could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <GoBack className="mb-6"/>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getActionTypeIcon(action.actionType)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Action Details</h1>
                    <p className="text-sm text-gray-600">Action ID: {id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {action.isSuccessful ? (
                    <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Success
                    </div>
                  ) : (
                    <div className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      <XCircle className="h-4 w-4 mr-1" />
                      Failed
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Action Information */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="p-1 bg-blue-100 rounded-lg mr-2">
                  {getActionTypeIcon(action.actionType)}
                </div>
                Action Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Action Type</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getActionTypeColor(action.actionType)}`}>
                    {action.actionType}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Entity Type</span>
                  <span className="text-sm font-semibold text-gray-900">{action.entityType}</span>
                </div>
                
                {action.entityName && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Entity Name</span>
                    <span className="text-sm text-gray-900">{action.entityName}</span>
                  </div>
                )}
                
                {action.entityId && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Entity ID</span>
                    <span className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">{action.entityId}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-600">Timestamp</span>
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(action.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* User Information */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                User Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Username</span>
                  <span className="text-sm font-semibold text-gray-900">{action.username || 'Unknown User'}</span>
                </div>
                
                {action.userRole && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Role</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUserRoleColor(action.userRole)}`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {action.userRole}
                    </span>
                  </div>
                )}
                
                {action.ipAddress && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">IP Address</span>
                    <div className="flex items-center text-sm text-gray-900">
                      <Globe className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">{action.ipAddress}</span>
                    </div>
                  </div>
                )}
                
                {action.userAgent && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-gray-600">Browser</span>
                    <div className="flex items-center text-sm text-gray-900">
                      <Monitor className="h-4 w-4 mr-1 text-gray-400" />
                      <span>
                        {action.userAgent.includes('Chrome') ? 'Chrome' : 
                         action.userAgent.includes('Firefox') ? 'Firefox' : 
                         action.userAgent.includes('Safari') ? 'Safari' : 
                         'Other'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Description */}
          {action.description && (
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{action.description}</p>
            </motion.div>
          )}

          {/* Error Message */}
          {!action.isSuccessful && action.errorMessage && (
            <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Error Details
              </h2>
              <p className="text-red-800 bg-red-100 p-3 rounded-lg font-mono text-sm">{action.errorMessage}</p>
            </motion.div>
          )}

          {/* Data Changes */}
          {action.actionType === 'UPDATE' && (action.oldValues || action.newValues) && (
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Data Changes</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {action.oldValues && (
                    <div>
                      <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Before Changes
                      </h3>
                      <pre className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm text-red-800 overflow-x-auto">
                        {JSON.stringify(JSON.parse(action.oldValues), null, 2)}
                      </pre>
                    </div>
                  )}
                  {action.newValues && (
                    <div>
                      <h3 className="text-sm font-semibold text-green-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        After Changes
                      </h3>
                      <pre className="bg-green-50 border border-green-200 p-4 rounded-lg text-sm text-green-800 overflow-x-auto">
                        {JSON.stringify(JSON.parse(action.newValues), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Deleted Data */}
          {action.actionType === 'DELETE' && action.oldValues && (
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                <h2 className="text-lg font-semibold text-red-900 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Deleted Data
                </h2>
              </div>
              <div className="p-6">
                <pre className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm text-red-800 overflow-x-auto">
                  {JSON.stringify(JSON.parse(action.oldValues), null, 2)}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Action;