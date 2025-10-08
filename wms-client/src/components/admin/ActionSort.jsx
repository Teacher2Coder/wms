import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, User, CheckCircle, XCircle, Shield } from "lucide-react";
import {
  getAllActions,
  getUserActions,
  getMyActions,
} from "../../utils/http/api";
import {
  getActionTypeIcon,
  getActionTypeColor,
  getUserRoleColor,
} from "../../utils/componentHelpers.jsx";
import { formatDate } from "../../utils/helpers";
import handleSmoothScroll from "../../utils/handleSmoothScroll";
import SortableTable from "../shared/SortableTable";

const ActionSort = ({ userId = null, showMyActions = false }) => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActions();
  }, [userId, showMyActions]);

  const fetchActions = async () => {
    try {
      setLoading(true);
      setError(null);
      let fetchedActions;

      if (showMyActions) {
        fetchedActions = await getMyActions();
      } else if (userId) {
        fetchedActions = await getUserActions(userId);
      } else {
        fetchedActions = await getAllActions();
      }

      setActions(fetchedActions);
    } catch (error) {
      console.error("Failed to fetch actions:", error);
      setError("Failed to load actions");
      setActions([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique values for filter options
  const getUniqueValues = (key) => {
    return [...new Set(actions.map((action) => action[key]).filter(Boolean))];
  };

  // Table columns configuration
  const columns = [
    { key: "timestamp", label: "Date", sortable: true },
    { key: "username", label: "User", sortable: true },
    { key: "actionType", label: "Action", sortable: true },
    { key: "entityType", label: "Entity", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "actions", label: "Actions", sortable: false }
  ];

  // Search configuration
  const searchConfig = {
    fields: ["username", "description", "entityName", "entityType"],
    placeholder: "Search actions by user, description, entity..."
  };

  // Filter configuration
  const filterConfig = [
    {
      key: "actionType",
      label: "Action Type",
      placeholder: "All Types",
      options: getUniqueValues("actionType").map(type => ({ value: type, label: type }))
    },
    {
      key: "entityType", 
      label: "Entity Type",
      placeholder: "All Entities",
      options: getUniqueValues("entityType").map(type => ({ value: type, label: type }))
    },
    {
      key: "userRole",
      label: "User Role", 
      placeholder: "All Roles",
      options: getUniqueValues("userRole").map(role => ({ value: role, label: role }))
    },
    {
      key: "isSuccessful",
      label: "Status",
      placeholder: "All Status",
      options: [
        { value: "true", label: "Successful" },
        { value: "false", label: "Failed" }
      ]
    },
    {
      key: "dateRange",
      label: "Date Range",
      placeholder: "All Time",
      options: [
        { value: "today", label: "Today" },
        { value: "week", label: "Last 7 Days" },
        { value: "month", label: "Last 30 Days" }
      ]
    }
  ];

  // Render table row
  const renderRow = (action) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          {formatDate(action.timestamp)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {action.username || "Unknown User"}
            </div>
            {action.userRole && (
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUserRoleColor(
                  action.userRole
                )}`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {action.userRole}
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getActionTypeIcon(action.actionType)}
          <span
            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionTypeColor(
              action.actionType
            )}`}
          >
            {action.actionType}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <div className="font-medium">{action.entityType}</div>
          {action.entityName && (
            <div className="text-gray-500">{action.entityName}</div>
          )}
          {action.entityId && (
            <div className="text-xs text-gray-400">
              ID: {action.entityId}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {action.isSuccessful ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          to={`/action/${action.id}`}
          onClick={() => handleSmoothScroll()}
          className="text-primary-600 hover:text-primary-900 transition-colors"
        >
          View Details
        </Link>
      </td>
    </>
  );

  const getTitle = () => {
    if (showMyActions) return "My Actions";
    if (userId) return "User Actions";
    return "All User Actions";
  };

  return (
    <SortableTable
      title={getTitle()}
      subtitle="View and manage system actions with advanced filtering"
      data={actions}
      columns={columns}
      loading={loading}
      error={error}
      searchConfig={searchConfig}
      filterConfig={filterConfig}
      defaultSort={{ key: "timestamp", direction: "desc" }}
      defaultPageSize={25}
      renderRow={renderRow}
    />
  );
};

export default ActionSort;
