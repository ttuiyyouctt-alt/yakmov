import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Film, Tv } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { getMovies, getSeries, deleteMovie, deleteSeries } from '../services/storage';
import { Movie, Series } from '../types';

export const ManageContent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [activeTab, setActiveTab] = useState<'movies' | 'series'>('movies');

  const refreshData = () => {
    setMovies(getMovies());
    setSeries(getSeries());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleDeleteMovie = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفيلم؟')) {
      deleteMovie(id);
      refreshData();
    }
  };

  const handleDeleteSeries = (id: string) => {
    if (window.confirm('سيتم حذف المسلسل وجميع حلقاته. هل أنت متأكد؟')) {
      deleteSeries(id);
      refreshData();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">إدارة المحتوى</h1>
          <p className="text-gray-400">تعديل وحذف الأفلام والمسلسلات</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('movies')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'movies' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            الأفلام
          </button>
          <button 
            onClick={() => setActiveTab('series')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'series' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            المسلسلات
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTab === 'movies' && movies.map(movie => (
          <GlassCard key={movie.id} className="p-0 overflow-hidden group">
            <div className="relative aspect-[2/3]">
              <img src={movie.coverImage} alt={movie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleDeleteMovie(movie.id)} className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform">
                  <Trash2 size={20} />
                </button>
                {/* Edit functionality would go to a generic edit page with ID */}
                <button className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform">
                  <Edit size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white truncate">{movie.title}</h3>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Film size={12} /> {movie.quality}</span>
                <span>{movie.year}</span>
              </div>
            </div>
          </GlassCard>
        ))}

        {activeTab === 'series' && series.map(s => (
          <GlassCard key={s.id} className="p-0 overflow-hidden group">
            <div className="relative aspect-[2/3]">
              <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleDeleteSeries(s.id)} className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white truncate">{s.title}</h3>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Tv size={12} /> {s.seasonsCount} مواسم</span>
                <span>{s.year}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {((activeTab === 'movies' && movies.length === 0) || (activeTab === 'series' && series.length === 0)) && (
        <div className="text-center py-20 text-gray-500">
          <p>لا يوجد محتوى حالياً</p>
        </div>
      )}
    </div>
  );
};