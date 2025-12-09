import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigStore, useAuthStore } from '@/store';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCTA from '@/components/ui/StickyCTA';

// Page Components
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import QuotePage from '@/pages/QuotePage';
import CustomerPortal from '@/pages/CustomerPortal';
import AdminDashboard from '@/pages/AdminDashboard';
import ContactPage from '@/pages/ContactPage';

// Authentication Components
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Loading Component
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Hooks
import { useScrollToTop, useInitializeApp } from '@/hooks';

function App() {
  // Custom hooks for app initialization and scroll behavior
  useInitializeApp();
  useScrollToTop();
  
  const { isLoading: configLoading } = useConfigStore();
  const { isAuthenticated } = useAuthStore();

  // Show loading spinner during app initialization
  if (configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header with Navigation */}
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Authentication Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/portal" replace /> : <LoginPage />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? <Navigate to="/portal" replace /> : <RegisterPage />
              } 
            />
            
            {/* Protected Customer Routes */}
            <Route 
              path="/portal/*" 
              element={
                <RequireAuth>
                  <CustomerPortal />
                </RequireAuth>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              } 
            />
            
            {/* 404 Route */}
            <Route 
              path="*" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="container section-padding text-center"
                >
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
                  <p className="text-lg text-slate-600 mb-8">
                    The page you're looking for doesn't exist.
                  </p>
                  <a 
                    href="/" 
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <HomeIcon className="w-5 h-5" />
                    Back to Home
                  </a>
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Sticky CTA with Theme Toggle */}
      <StickyCTA />
    </div>
  );
}

// Protected Route Components
interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Import HomeIcon from lucide-react
import { Home as HomeIcon } from 'lucide-react';

export default App;