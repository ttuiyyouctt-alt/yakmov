import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  Tv, 
  PlusCircle, 
  LogOut, 
  ListVideo,
  Globe
} from 'lucide-react';
import { logoutAdmin } from '../services/storage';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { path: '/admin/add-movie', label: 'إضافة فيلم', icon: Film },
    { path: '/admin/add-series', label: 'إضافة مسلسل', icon: Tv },
    { path: '/admin/add-episode', label: 'إضافة حلقة', icon: PlusCircle },
    { path: '/admin/manage', label: 'إدارة المحتوى', icon: ListVideo },
  ];

  return (
    <aside className="w-64 h-screen fixed right-0 top-0 bg-slate-900/95 backdrop-blur-md border-l border-white/10 flex flex-col z-50 shadow-2xl">
      <div className="p-8 text-center border-b border-white/5">
        <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          YAKMOV
        </h1>
        <p className="text-xs text-gray-400 mt-2 tracking-widest">ADMIN PANEL</p>
      </div>

      <div className="px-4 pt-4">
        <Link to="/" className="flex items-center gap-2 justify-center w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-400 transition-colors">
          <Globe size={14} />
          عرض الموقع
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 font-bold"
        >
          <LogOut size={20} />
          <span>تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
};