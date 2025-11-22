import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { GlassCard } from '../components/GlassCard';
import { getMovies, getSeries, getEpisodes } from '../services/storage';
import { Movie, Series, Episode } from '../types';
import { PlayCircle, Calendar, Clock, Film } from 'lucide-react';

export const Watch: React.FC = () => {
  const { type, id } = useParams();
  const [content, setContent] = useState<Movie | Series | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEp, setCurrentEp] = useState<Episode | null>(null);

  useEffect(() => {
    if (type === 'movie') {
      const movies = getMovies();
      const movie = movies.find(m => m.id === id);
      setContent(movie || null);
    } else if (type === 'series') {
      const allSeries = getSeries();
      const series = allSeries.find(s => s.id === id);
      setContent(series || null);
      if (series) {
        const eps = getEpisodes(series.id).sort((a, b) => a.episodeNumber - b.episodeNumber);
        setEpisodes(eps);
        if (eps.length > 0) setCurrentEp(eps[0]);
      }
    }
  }, [type, id]);

  if (!content) return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">جاري التحميل...</div>;

  const currentStreamUrl = type === 'movie' ? (content as Movie).streamUrl : currentEp?.streamUrl;

  return (
    <div className="min-h-screen bg-[#0f172a] pb-20">
      <Navbar />
      
      {/* Player Section */}
      <div className="w-full bg-black relative">
        <div className="max-w-6xl mx-auto aspect-video bg-black shadow-2xl shadow-purple-900/20">
          {currentStreamUrl ? (
            <iframe 
              src={currentStreamUrl} 
              className="w-full h-full border-0" 
              allowFullScreen 
              title={content.title}
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 flex-col gap-2">
               <Film size={48} />
               <p>عذراً، لا يوجد سيرفر مشاهدة متاح حالياً.</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {content.title} 
              {type === 'series' && currentEp && <span className="text-purple-400"> - الحلقة {currentEp.episodeNumber}</span>}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
              <span className="bg-white/10 px-3 py-1 rounded-full text-white">{content.category}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {content.year}</span>
              {'duration' in content && <span className="flex items-center gap-1"><Clock size={14} /> {(content as Movie).duration} دقيقة</span>}
            </div>
          </div>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-2">القصة</h3>
            <p className="text-gray-300 leading-relaxed">{content.description}</p>
          </GlassCard>
        </div>

        {/* Sidebar (Episodes or Related) */}
        <div className="lg:col-span-1">
          {type === 'series' && (
            <GlassCard className="p-0 overflow-hidden h-[500px] flex flex-col">
              <div className="p-4 bg-white/5 border-b border-white/10">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <PlayCircle size={20} className="text-pink-500" />
                  الحلقات ({episodes.length})
                </h3>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {episodes.length > 0 ? episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => setCurrentEp(ep)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-right
                      ${currentEp?.id === ep.id 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold shrink-0">
                      {ep.episodeNumber}
                    </div>
                    <div className="truncate">
                      <span className="block font-bold text-sm">{ep.title || `الحلقة ${ep.episodeNumber}`}</span>
                    </div>
                  </button>
                )) : (
                  <div className="text-center py-10 text-gray-500 text-sm">لا توجد حلقات مضافة بعد</div>
                )}
              </div>
            </GlassCard>
          )}

          {type === 'movie' && (
             <GlassCard className="text-center p-8">
                <Film size={48} className="mx-auto text-purple-500 mb-4" />
                <h3 className="font-bold text-white mb-2">مشاهدة ممتعة!</h3>
                <p className="text-gray-400 text-sm">نتمنى لكم وقتاً ممتعاً في مشاهدة {content.title}</p>
             </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};