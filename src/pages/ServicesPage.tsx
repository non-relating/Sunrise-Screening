import React from 'react';
import { motion } from 'framer-motion';

const ServicesPage: React.FC = () => {
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
            Our Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Professional pool screen repair and replacement services in St. Petersburg, Florida.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Screen Repair",
              description: "Quick fixes for torn panels and worn-out mesh",
              price: "Starting at $150"
            },
            {
              title: "Full Rescreen",
              description: "Complete restoration of your pool cage",
              price: "Starting at $800"
            },
            {
              title: "Storm Damage Repair",
              description: "Fast priority response for hurricane damage",
              price: "Starting at $200"
            }
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <p className="text-lg font-semibold text-amber-600">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;