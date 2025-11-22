import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { getMovies, getSeries } from '../services/storage';
import { Movie, Series } from '../types';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [featured, setFeatured] = useState<Movie | Series | null>(null);

  useEffect(() => {
    const m = getMovies();
    const s = getSeries();
    setMovies(m);
    setSeries(s);
    
    // Pick a random featured item
    const all = [...m, ...s];
    if (all.length > 0) {
      setFeatured(all[Math.floor(Math.random() * all.length)]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] pb-20">
      <Navbar />
      
      {/* Hero Section */}
      {featured && (
        <div className="relative w-full h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-10"></div>
          <img 
            src={featured.backgroundImage || featured.coverImage} 
            alt={featured.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute bottom-0 right-0 z-20 p-8 md:p-16 max-w-3xl w-full">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-4">
              {'quality' in featured ? 'فيلم' : 'مسلسل'} • {featured.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl leading-tight">
              {featured.title}
            </h1>
            <p className="text-gray-200 text-lg mb-8 line-clamp-3 drop-shadow-md">
              {featured.description}
            </p>
            <div className="flex gap-4">
              <Link 
                to={`/watch/${'quality' in featured ? 'movie' : 'series'}/${featured.id}`}
                className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-purple-900/30 hover:scale-105"
              >
                <Play fill="currentColor" />
                مشاهدة الآن
              </Link>
              <button className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold transition-all hover:scale-105">
                <Info />
                تفاصيل أكثر
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-16">
        {/* Movies Section */}
        {movies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-r-4 border-purple-500 pr-4">أحدث الأفلام</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/watch/movie/${movie.id}`}
                  className="group relative aspect-[2/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <img src={movie.coverImage} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-purple-400 text-xs font-bold mb-1">{movie.category}</span>
                    <h3 className="text-white font-bold leading-tight">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] bg-white/20 px-2 py-1 rounded text-gray-200">{movie.year}</span>
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded">{movie.quality}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Series Section */}
        {series.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-r-4 border-pink-500 pr-4">أحدث المسلسلات</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {series.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/watch/series/${item.id}`}
                  className="group relative aspect-[2/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
                >
                  <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-pink-400 text-xs font-bold mb-1">{item.category}</span>
                    <h3 className="text-white font-bold leading-tight">{item.title}</h3>
                     <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] bg-white/20 px-2 py-1 rounded text-gray-200">{item.year}</span>
                      <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-1 rounded">{item.seasonsCount} مواسم</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {movies.length === 0 && series.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">لا يوجد محتوى مضاف حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};