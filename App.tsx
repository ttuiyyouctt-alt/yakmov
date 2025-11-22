import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AddMovie } from './pages/AddMovie';
import { AddSeries } from './pages/AddSeries';
import { AddEpisode } from './pages/AddEpisode';
import { ManageContent } from './pages/ManageContent';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import { isAuthenticated } from './services/storage';

// Admin Layout Component
const AdminLayout = ({ children }: { children: React.ReactElement }) => {
  const isAuth = isAuthenticated();
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-tajawal overflow-hidden">
      <Sidebar />
      <main className="flex-1 mr-64 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/watch/:type/:id" element={<Watch />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        
        <Route path="/admin/add-movie" element={
          <AdminLayout>
            <AddMovie />
          </AdminLayout>
        } />
        
        <Route path="/admin/add-series" element={
          <AdminLayout>
            <AddSeries />
          </AdminLayout>
        } />

        <Route path="/admin/add-episode" element={
          <AdminLayout>
            <AddEpisode />
          </AdminLayout>
        } />

        <Route path="/admin/manage" element={
          <AdminLayout>
            <ManageContent />
          </AdminLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;