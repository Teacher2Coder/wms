import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Globe } from "lucide-react";
import Actions from "./Actions";
import AdminCard from "../shared/AdminCard";
import AdminSection from "../shared/AdminSection";
import handleSmoothScroll from "../../utils/handleSmoothScroll";

const Overview = ({ overviewCards, quickActions, stats, actions }) => {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AdminCard
              title={card.title}
              value={card.count}
              subtitle={card.description}
              icon={<card.icon className="h-6 w-6" />}
              color={card.color?.includes('blue') ? 'blue' : 
                    card.color?.includes('green') ? 'green' : 
                    card.color?.includes('red') ? 'red' : 
                    card.color?.includes('purple') ? 'purple' : 'blue'}
              onClick={card.action}
              variant="simple"
            />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <AdminSection
        title="Administrative Actions"
        subtitle="Quick access to common administrative tasks"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {action.link ? (
                <Link
                  to={action.link}
                  onClick={() => handleSmoothScroll()}
                  className="block"
                >
                  <AdminCard
                    title={action.title}
                    subtitle={action.description}
                    icon={<action.icon className="h-5 w-5" />}
                    color={action.color?.includes('blue') ? 'blue' : 
                          action.color?.includes('green') ? 'green' : 
                          action.color?.includes('red') ? 'red' : 
                          action.color?.includes('purple') ? 'purple' : 'blue'}
                    variant="simple"
                  />
                </Link>
              ) : (
                <AdminCard
                  title={action.title}
                  subtitle={action.description}
                  icon={<action.icon className="h-5 w-5" />}
                  color={action.color?.includes('blue') ? 'blue' : 
                        action.color?.includes('green') ? 'green' : 
                        action.color?.includes('red') ? 'red' : 
                        action.color?.includes('purple') ? 'purple' : 'blue'}
                  onClick={action.action}
                  variant="simple"
                />
              )}
            </motion.div>
          ))}
        </div>
      </AdminSection>

      {/* System Status */}
      <AdminSection
        title="System Status"
        subtitle="Current system health and connectivity"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">API Server</p>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-sm text-green-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Uptime</p>
              <p className="text-sm text-blue-600">{stats.systemUptime}</p>
            </div>
          </div>
        </div>
      </AdminSection>

      <Actions actions={actions} />
    </motion.div>
  );
};

export default Overview;
