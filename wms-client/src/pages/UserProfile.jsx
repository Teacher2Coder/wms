import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { User, Edit3, Key, Calendar, Shield } from "lucide-react";
import { getUserActions, getUser } from "../utils/http/api";
import Actions from "../components/admin/Actions";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import EditProfile from "../components/profile/EditProfile";
import EditPassword from "../components/profile/EditPassword";
import SuccessMessage from "../components/SuccessMessage";

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const [actionsLoading, setActionsLoading] = useState(true);
  const [actionsError, setActionsError] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.id.toString() === id) {
      navigate("/profile", { replace: true });
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await getUser(id);
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    const fetchActions = async () => {
      try {
        setActionsLoading(true);
        setActionsError(null);
        const userActions = await getUserActions(id);
        setActions(userActions);
      } catch (error) {
        console.error("Failed to fetch user actions:", error);
        setActionsError("Failed to load your activity history");
        setActions([]); // Set empty array on error
      } finally {
        setActionsLoading(false);
      }
    };

    // Only fetch data if we're not redirecting
    if (currentUser && currentUser.id.toString() !== id) {
      fetchUser();
      fetchActions();
    }
  }, [id, currentUser, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFound />
      </div>
    );
  }

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <SuccessMessage successMessage={successMessage} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                    user.role === "Admin"
                      ? "bg-red-100 text-red-800"
                      : user.role === "Manager"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setShowEditProfileModal(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setShowEditPasswordModal(true)}
              >
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.firstName || "Not specified"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Status
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.lastName || "Not specified"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {user.role}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Since
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {user.lastLoginAt && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Login
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  {new Date(user.lastLoginAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <Actions
          actions={actions}
          loading={actionsLoading}
          error={actionsError}
        />

        <EditProfile
          user={user}
          showEditModal={showEditProfileModal}
          closeModals={() => setShowEditProfileModal(false)}
          onSuccess={handleSuccess}
        />

        <EditPassword
          user={user}
          showPasswordModal={showEditPasswordModal}
          closeModals={() => setShowEditPasswordModal(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};

export default UserProfile;
