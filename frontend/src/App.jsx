import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';

import OrderHistory from './pages/OrderHistory';
import PosDashboard from './pages/PosDashboard';
import Sales from './pages/Sales';

import DashboardLayout from './components/DashboardLayout';
import Landing from './pages/Landing';
import Features from './pages/Features';
import Pricing from './pages/Pricing';

const ProtectedRoute = ({ children, adminOnly = false, cashierOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) return <Navigate to="/login" />;
  if (adminOnly && userInfo.role !== 'admin') return <Navigate to="/" />;
  if (cashierOnly && userInfo.role !== 'cashier' && userInfo.role !== 'admin') return <Navigate to="/" />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full border border-red-100">
             <h1 className="text-2xl font-black text-red-600 mb-4">React Error</h1>
             <p className="text-slate-800 font-bold mb-4">{this.state.error?.toString()}</p>
             <pre className="bg-slate-100 p-4 rounded-xl text-xs overflow-auto max-h-96 text-slate-600">
               {this.state.info?.componentStack}
             </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <ErrorBoundary>
            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/scan" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                
                <Route path="/pos" element={<ProtectedRoute cashierOnly><PosDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
                <Route path="/sales" element={<ProtectedRoute adminOnly><Sales /></ProtectedRoute>} />
              </Routes>
            </div>
            <Toaster position="bottom-right" />
          </ErrorBoundary>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
