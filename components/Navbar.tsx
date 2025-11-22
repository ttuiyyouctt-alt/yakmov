import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LogIn } from 'lucide-react';
import { isAuthenticated } from '../services/storage';

export const Navbar: React.FC = () => {
  const isAuth = isAuthenticated();

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          YAKMOV
        </Link>

        <div className="flex items-center gap-4">
          {isAuth ? (
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all shadow-lg shadow-purple-900/50"
            >
              <LayoutDashboard size={18} />
              <span>لوحة التحكم</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all border border-white/10 backdrop-blur-md"
            >
              <LogIn size={18} />
              <span>دخول المدير</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};