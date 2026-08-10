// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mt-4">Welcome to your dashboard!</p>
    </motion.div>
  );
};

export default Dashboard;
