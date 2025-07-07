import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import RedirectHandler from './components/Redirect/RedirectHandler';
import Terms from './components/Legal/Terms';
import Privacy from './components/Legal/Privacy';
import Cookies from './components/Legal/Cookies';
import FAQ from './components/FAQ/FAQ';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect routes (no layout) */}
          <Route path="/:shortCode" element={<RedirectHandler />} />
          
          {/* Main app routes (with layout) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Layout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Layout>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Layout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Layout>
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </Layout>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <Layout>
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;