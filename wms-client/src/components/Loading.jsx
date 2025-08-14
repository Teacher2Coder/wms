import { motion } from 'framer-motion';

const Loading = ({ size = '40px', color = '#3B82F6' }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="border-4 border-gray-200 rounded-full"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export default Loading;