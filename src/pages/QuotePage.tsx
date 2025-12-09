import React from 'react';
import { motion } from 'framer-motion';

const QuotePage: React.FC = () => {
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
            Get Your Free Quote
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Interactive quote calculator coming soon. For now, call us directly for a free estimate.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-slate-600 mb-6">
              Contact us today for a free, no-obligation quote on your pool screen repair or replacement.
            </p>
            <a
              href="tel:+15551234567"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Call (555) 123-4567
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuotePage;