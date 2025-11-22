import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Film, 
  Tv, 
  Users, 
  Eye, 
  Plus, 
  Download,
  TrendingUp
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { getStats } from '../services/storage';
import { DashboardStats } from '../types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalMovies: 0,
    totalSeries: 0,
    totalEpisodes: 0,
    totalViews: 0
  });

  useEffect(() => {
    setStats(getStats());
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <GlassCard className="relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className={`absolute -right-4 -top-4 p-4 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={100} />
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-white/5 ${color.replace('bg-', 'text-')}`}>
            <Icon size={24} />
          </div>
          <span className="text-xs font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-lg">
            <TrendingUp size={12} /> +24%
          </span>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-black text-white">{value.toLocaleString()}</p>
      </div>
    </GlassCard>
  );

  const QuickAction = ({ title, to, icon: Icon, color }: any) => (
    <Link to={to} className="block">
      <div className={`
        h-full p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 
        transition-all duration-300 flex flex-col items-center justify-center gap-3 group
        hover:shadow-lg hover:shadow-${color}-500/20
      `}>
        <div className={`p-4 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300 text-${color}-400`}>
          <Icon size={32} />
        </div>
        <span className="font-bold text-gray-300 group-hover:text-white">{title}</span>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">مرحباً، مدير YAKMOV 👋</h1>
          <p className="text-gray-400">إليك نظرة عامة على أداء المنصة اليوم</p>
        </div>
        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-sm transition-colors">
          تحديث البيانات
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="إجمالي المشاهدات" 
          value={stats.totalViews} 
          icon={Eye} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="الأفلام المضافة" 
          value={stats.totalMovies} 
          icon={Film} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="المسلسلات" 
          value={stats.totalSeries} 
          icon={Tv} 
          color="bg-pink-500" 
        />
        <StatCard 
          title="المستخدمين النشطين" 
          value={1254} 
          icon={Users} 
          color="bg-orange-500" 
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Plus className="text-purple-500" />
          إضافة سريعة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction title="إضافة فيلم" to="/add-movie" icon={Film} color="purple" />
          <QuickAction title="إضافة مسلسل" to="/add-series" icon={Tv} color="pink" />
          <QuickAction title="إضافة حلقات" to="/add-episode" icon={Plus} color="blue" />
          <QuickAction title="إدارة الإعلانات" to="/manage" icon={Download} color="green" />
        </div>
      </div>

      {/* Recent Activity Table Mockup */}
      <GlassCard className="overflow-hidden p-0">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-lg">آخر الإضافات</h3>
          <Link to="/manage" className="text-sm text-purple-400 hover:text-purple-300">عرض الكل</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm text-gray-400">
            <thead className="bg-white/5 text-gray-200 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4">العنوان</th>
                <th className="px-6 py-4">النوع</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="px-6 py-4 font-medium text-white">Inception</td>
                <td className="px-6 py-4">فيلم</td>
                <td className="px-6 py-4">2025-01-10</td>
                <td className="px-6 py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">نشط</span></td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-white">Breaking Bad</td>
                <td className="px-6 py-4">مسلسل</td>
                <td className="px-6 py-4">2025-01-09</td>
                <td className="px-6 py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">نشط</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};