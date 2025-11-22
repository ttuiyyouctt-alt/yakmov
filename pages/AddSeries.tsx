import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Save, Loader } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { fileToBase64, saveSeries } from '../services/storage';

export const AddSeries: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'دراما',
    year: new Date().getFullYear().toString(),
    seasonsCount: 1
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
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !coverImage) {
      alert("يرجى تعبئة الحقول الأساسية");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newSeries = {
        id: Date.now().toString(),
        ...formData,
        seasonsCount: Number(formData.seasonsCount),
        coverImage: coverImage,
        backgroundImage: bgImage || '',
        addedAt: Date.now()
      };

      saveSeries(newSeries);
      setLoading(false);
      
      // Ask to add episodes immediately
      if(window.confirm("تمت إضافة المسلسل بنجاح! هل تريد إضافة حلقات الآن؟")) {
        navigate('/admin/add-episode');
      } else {
        navigate('/admin');
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">إضافة مسلسل جديد</h1>
        <p className="text-gray-400">قم بإنشاء سجل المسلسل أولاً ثم أضف الحلقات</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="text-center">
              <label className="block mb-4 font-medium text-gray-300">بوستر المسلسل</label>
              <div className="relative aspect-[2/3] rounded-xl border-2 border-dashed border-white/20 bg-white/5 overflow-hidden hover:border-pink-500 transition-colors group cursor-pointer">
                {coverImage ? (
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Upload size={32} className="mb-2 group-hover:text-pink-400 transition-colors" />
                    <span className="text-xs">رفع صورة</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <label className="block mb-4 font-medium text-gray-300">خلفية (اختياري)</label>
              <div className="relative aspect-video rounded-xl border-2 border-dashed border-white/20 bg-white/5 overflow-hidden hover:border-pink-500 transition-colors group cursor-pointer">
                {bgImage ? (
                  <img src={bgImage} alt="BG" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Upload size={32} className="mb-2 group-hover:text-pink-400 transition-colors" />
                    <span className="text-xs">رفع صورة</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'bg')} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1">عنوان المسلسل</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">القصة / الوصف</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none transition-colors"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">التصنيف</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-pink-500 focus:outline-none">
                    <option>دراما</option>
                    <option>أكشن</option>
                    <option>كوميديا</option>
                    <option>تاريخي</option>
                    <option>أنمي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">سنة العرض</label>
                  <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">عدد المواسم</label>
                <input type="number" name="seasonsCount" value={formData.seasonsCount} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none" />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader className="animate-spin" /> : <Save />}
                  <span>حفظ ومتابعة للحلقات</span>
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </form>
    </div>
  );
};