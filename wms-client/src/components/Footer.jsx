import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import handleSmoothScroll from '../utils/handleSmoothScroll'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-accent-900 border-t border-gray-200 dark:border-accent-700">
      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              Warehouse Management System
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Warehouse Management System is a system that allows you to manage your warehouses and items.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                to="/home" 
                className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300" 
                onClick={() => handleSmoothScroll()}
              >
                Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-accent-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Teacher2Coder. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
