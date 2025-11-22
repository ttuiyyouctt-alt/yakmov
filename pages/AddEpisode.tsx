import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Loader, AlertCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { getSeries, saveEpisode, getEpisodes } from '../services/storage';
import { Series } from '../types';

export const AddEpisode: React.FC = () => {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    episodeNumber: '',
    title: '',
    streamUrl: '',
  });

  useEffect(() => {
    setSeriesList(getSeries());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeries || !formData.episodeNumber || !formData.streamUrl) {
      alert("الرجاء اختيار المسلسل وتحديد رقم الحلقة والرابط");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newEpisode = {
        id: Date.now().toString(),
        seriesId: selectedSeries,
        episodeNumber: Number(formData.episodeNumber),
        title: formData.title,
        streamUrl: formData.streamUrl,
        addedAt: Date.now()
      };

      saveEpisode(newEpisode);
      setLoading(false);
      setMessage('تمت إضافة الحلقة بنجاح!');
      
      // Reset form for next episode
      setFormData({
        episodeNumber: (Number(formData.episodeNumber) + 1).toString(),
        title: '',
        streamUrl: ''
      });
      
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">إضافة حلقات</h1>
        <p className="text-gray-400">أضف روابط المشاهدة لحلقات المسلسلات</p>
      </div>

      {seriesList.length === 0 ? (
         <div className="p-6 bg-yellow-500/10 text-yellow-400 rounded-xl flex items-center gap-3 border border-yellow-500/20">
           <AlertCircle />
           <span>لا توجد مسلسلات مضافة. الرجاء إضافة مسلسل أولاً.</span>
         </div>
      ) : (
        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1">اختر المسلسل</label>
              <select 
                value={selectedSeries} 
                onChange={(e) => setSelectedSeries(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">-- اختر --</option>
                {seriesList.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">رقم الحلقة</label>
                <input 
                  type="number" 
                  name="episodeNumber" 
                  value={formData.episodeNumber} 
                  onChange={handleInputChange} 
                  placeholder="1"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">عنوان الحلقة (اختياري)</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="الطيار"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">رابط السيرفر (Embed)</label>
              <input 
                type="url" 
                name="streamUrl" 
                value={formData.streamUrl} 
                onChange={handleInputChange} 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none ltr text-left" 
                dir="ltr"
                placeholder="https://..."
              />
            </div>

            {message && (
              <div className="p-3 bg-green-500/20 text-green-400 rounded-lg text-center font-bold">
                {message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" /> : <Save />}
              <span>نشر الحلقة</span>
            </button>
          </form>
        </GlassCard>
      )}
    </div>
  );
};