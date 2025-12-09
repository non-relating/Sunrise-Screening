import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <div className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Manage customer requests, service history, and business operations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Coming Soon</h2>
            <p className="text-slate-600 mb-6">
              The admin dashboard with customer management, service request tracking, and business analytics is coming soon.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Preview Features:</strong> Customer management, service request overview, quote generation, appointment scheduling, business analytics and reporting.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;