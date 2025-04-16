import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PulseProvider } from "./contexts/PulseContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from './components/Navbar';

// Pages
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEvent";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EventHome from "./pages/EventHome";
import EventRegistration from "./pages/EventRegistration";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import PaymentSuccess from "./pages/PaymentSuccess";
import VerifyEmail from './components/VerifyEmail';
import Profile from './pages/Profile';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface PublicRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Remove automatic redirect for authenticated users
  return <>{children}</>;
};

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
      <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
      <Route path="/events" element={<PublicRoute><EventHome /></PublicRoute>} />
      <Route path="/event/:id" element={<PublicRoute><EventPage /></PublicRoute>} />
      <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="/verify-email/:token" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
      <Route path="/profile" element={<PublicRoute><Profile /></PublicRoute>} />

      {/* Protected Routes - require authentication */}
      <Route path="/event/:id/register" element={<ProtectedRoute><EventRegistration /></ProtectedRoute>} />
      <Route path="/event/:id/payment-confirmation" element={<ProtectedRoute><PaymentConfirmation /></ProtectedRoute>} />
      <Route path="/event/:id/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
      <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PulseProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Navbar />
              <AppRoutes />
              <Toaster />
            </div>
          </Router>
        </PulseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
