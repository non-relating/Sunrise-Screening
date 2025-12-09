import React from 'react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
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
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get in touch with our team for all your pool screen repair needs.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-700">Phone</h3>
                <a href="tel:+15551234567" className="text-primary-600 hover:text-primary-700">
                  (555) 123-4567
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Email</h3>
                <a href="mailto:info@sunrisescreening.com" className="text-primary-600 hover:text-primary-700">
                  info@sunrisescreening.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Service Area</h3>
                <p className="text-slate-600">St. Petersburg, FL and surrounding areas</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Hours</h2>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;