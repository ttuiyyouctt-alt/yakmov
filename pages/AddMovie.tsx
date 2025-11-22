import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Save, Loader } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { fileToBase64, saveMovie } from '../services/storage';
import { ContentType } from '../types';

export const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'أكشن',
    streamUrl: '',
    downloadUrl: '',
    year: new Date().getFullYear().toString(),
    country: '',
    duration: '',
    quality: '1080p FHD'
  });
  
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'bg') => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await fileToBase64(e.target.files[0]);
        if (type === 'cover') setCoverImage(base64);
        else setBgImage(base64);
      } catch (err) {
        console.error("Error converting file", err);
        alert("فشل في تحميل الصورة");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !coverImage) {
      alert("يرجى تعبئة الحقول الأساسية وصورة الغلاف");
      return;
    }

    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newMovie = {
        id: Date.now().toString(),
        ...formData,
        coverImage: coverImage,
        backgroundImage: bgImage || '',
        views: 0,
        addedAt: Date.now()
      };

      saveMovie(newMovie);
      setLoading(false);
      navigate('/admin'); // Redirect to dashboard
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">إضافة فيلم جديد</h1>
        <p className="text-gray-400">أدخل تفاصيل الفيلم للنشر الفوري</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Right Column: Images */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="text-center">
              <label className="block mb-4 font-medium text-gray-300">صورة الغلاف (Poster)</label>
              <div className="relative aspect-[2/3] rounded-xl border-2 border-dashed border-white/20 bg-white/5 overflow-hidden hover:border-purple-500 transition-colors group cursor-pointer">
                {coverImage ? (
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Upload size={32} className="mb-2 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs">اضغط للرفع</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <label className="block mb-4 font-medium text-gray-300">صورة الخلفية (Background)</label>
              <div className="relative aspect-video rounded-xl border-2 border-dashed border-white/20 bg-white/5 overflow-hidden hover:border-purple-500 transition-colors group cursor-pointer">
                {bgImage ? (
                  <img src={bgImage} alt="BG" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Upload size={32} className="mb-2 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs">اضغط للرفع</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'bg')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </GlassCard>
          </div>

          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <GlassCard className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1">عنوان الفيلم</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors" 
                  placeholder="مثل: Avengers: Endgame" 
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">وصف الفيلم</label>
                <textarea 
                  name="description" 
                  rows={4} 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors" 
                  placeholder="قصة الفيلم..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">التصنيف</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-purple-500 focus:outline-none">
                    <option>أكشن</option>
                    <option>دراما</option>
                    <option>رعب</option>
                    <option>خيال علمي</option>
                    <option>كوميديا</option>
                    <option>أنمي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">سنة الإنتاج</label>
                  <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">الجودة</label>
                  <select name="quality" value={formData.quality} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-purple-500 focus:outline-none">
                    <option>4K Ultra HD</option>
                    <option>1080p FHD</option>
                    <option>720p HD</option>
                    <option>480p SD</option>
                    <option>CAM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">المدة (دقيقة)</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="120" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">البلد</label>
                  <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="USA" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">رابط المشاهدة (Embed)</label>
                <input type="url" name="streamUrl" value={formData.streamUrl} onChange={handleInputChange} placeholder="https://server.com/embed/..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none text-left ltr" dir="ltr" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">رابط التحميل</label>
                <input type="url" name="downloadUrl" value={formData.downloadUrl} onChange={handleInputChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none text-left ltr" dir="ltr" />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader className="animate-spin" /> : <Save />}
                  <span>نشر الفيلم</span>
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </form>
    </div>
  );
};