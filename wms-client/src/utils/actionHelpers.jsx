import React from "react";
import { CheckCircle, AlertCircle, XCircle, User, Clock } from "lucide-react";

export const getActionTypeIcon = (actionType) => {
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

export const getActionTypeColor = (actionType) => {
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

export const getUserRoleColor = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    case 'manager':
      return 'bg-blue-100 text-blue-800';
    case 'employee':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};