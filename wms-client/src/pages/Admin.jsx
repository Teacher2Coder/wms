import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Settings,
  Shield,
  Eye,
  Database,
  Activity,
  TrendingUp,
  Crown,
  Download,
  Server,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import auth from "../utils/auth/auth.js";
import Overview from "../components/admin/Overview.jsx";
import UserManagement from "../components/admin/UserManagement.jsx";
import SystemHealth from "../components/admin/SystemHealth.jsx";
import Security from "../components/admin/Security.jsx";
import DataManagement from "../components/admin/DataManagement.jsx";
import Analytics from "../components/admin/Analytics.jsx";
import handleSmoothScroll from "../utils/handleSmoothScroll";
import { getAllActions } from "../utils/http/api";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    apiStatus: "online",
    dbStatus: "online",
    lastBackup: new Date().toISOString(),
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0,
    managerUsers: 0,
    employeeUsers: 0,
    totalWarehouses: 0,
    totalProducts: 0,
    totalOrders: 0,
    systemUptime: "99.9%",
  });
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchActions = async () => {
      const fetchedActions = await getAllActions();
      setActions(fetchedActions);
    };
    fetchActions();
  }, []);

  // Redirect if user doesn't have admin permissions
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Access Required
          </h2>
          <p className="text-gray-600 mb-4">
            You need Administrator privileges to access this page.
          </p>
          <Link
            to="/"
            onClick={() => handleSmoothScroll()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchUsers();
    fetchSystemStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = await auth.getAllUsers();
      setUsers(userData);

      // Calculate user statistics
      const totalUsers = userData.length;
      const activeUsers = userData.filter((u) => u.isActive).length;
      const inactiveUsers = totalUsers - activeUsers;
      const adminUsers = userData.filter((u) => u.role === "Admin").length;
      const managerUsers = userData.filter((u) => u.role === "Manager").length;
      const employeeUsers = userData.filter(
        (u) => u.role === "Employee"
      ).length;

      setStats((prev) => ({
        ...prev,
        totalUsers,
        activeUsers,
        inactiveUsers,
        adminUsers,
        managerUsers,
        employeeUsers,
      }));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemStats = () => {
    // In a real app, you'd fetch these from your API
    setStats((prev) => ({
      ...prev,
      totalWarehouses: 4,
      totalProducts: 25,
      totalOrders: 156,
      systemUptime: "99.9%",
    }));
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await auth.deleteUser(userId);
        await fetchUsers(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleToggleUserStatus = async () => {
    try {
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  const overviewCards = [
    {
      title: "Total Users",
      description: "All registered users in the system",
      icon: Users,
      color: "bg-blue-500",
      count: stats.totalUsers,
      action: () => setActiveTab("users"),
    },
    {
      title: "System Health",
      description: "Monitor system performance and status",
      icon: Activity,
      color: "bg-green-500",
      count: stats.systemUptime,
      action: () => setActiveTab("system"),
    },
    {
      title: "Security Center",
      description: "Manage security settings and permissions",
      icon: Shield,
      color: "bg-red-500",
      count: stats.adminUsers,
      action: () => setActiveTab("security"),
    },
    {
      title: "Data Management",
      description: "Backup, restore, and manage data",
      icon: Database,
      color: "bg-purple-500",
      count: "24h",
      action: () => setActiveTab("data"),
    },
  ];

  const quickActions = [
    {
      title: "Create Admin User",
      description: "Add a new administrator",
      icon: Crown,
      color: "bg-red-500",
      link: "/register",
    },
    {
      title: "System Backup",
      description: "Create system backup",
      icon: Download,
      color: "bg-blue-500",
      action: () => console.log("System backup initiated"),
    },
    {
      title: "View Audit Logs",
      description: "Review system audit trail",
      icon: Eye,
      color: "bg-yellow-500",
      action: () => setActiveTab("security"),
    },
    {
      title: "System Settings",
      description: "Configure system parameters",
      icon: Settings,
      color: "bg-gray-500",
      action: () => setActiveTab("system"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Crown className="h-8 w-8 text-red-600 mr-3" />
                Administrator Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName}! You have full system control.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <Crown className="h-4 w-4 mr-1" />
                Administrator
              </span>
              <div
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  systemStatus.apiStatus === "online"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    systemStatus.apiStatus === "online"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                System {systemStatus.apiStatus}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <nav className="flex space-x-8 bg-white rounded-lg p-1 shadow-sm border border-gray-200 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "users", label: "User Management", icon: Users },
              { id: "system", label: "System Health", icon: Server },
              { id: "security", label: "Security", icon: Shield },
              { id: "data", label: "Data Management", icon: Database },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <Overview
              overviewCards={overviewCards}
              quickActions={quickActions}
              stats={stats}
              actions={actions}
            />
          )}

          {activeTab === "users" && (
            <UserManagement
              users={users}
              loading={loading}
              stats={stats}
              user={user}
              fetchUsers={fetchUsers}
              handleToggleUserStatus={handleToggleUserStatus}
              handleDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === "system" && <SystemHealth stats={stats} />}

          {activeTab === "security" && <Security stats={stats} />}

          {activeTab === "data" && <DataManagement />}

          {activeTab === "analytics" && <Analytics stats={stats} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
