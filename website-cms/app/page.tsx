'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

const initialCategories = [
  'Semua Materi',
  'Mitigasi Banjir',
  'Panduan Gempa',
  'Kebakaran Hutan',
  'Tsunami & Erupsi',
  'Umum',
];

const topContent = [
  { id: '01', title: 'Evakuasi Mandiri Saat Banjir', views: '12.4k tayangan' },
  { id: '02', title: 'Persiapan Tas Siaga Bencana', views: '8.1k tayangan' },
  { id: '03', title: 'Nomor Darurat Nasional', views: '6.7k tayangan' },
];

export default function DashboardPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua Materi');

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('MITIGASI BANJIR');
  const [formImage, setFormImage] = useState('');
  const [formStatus, setFormStatus] = useState('DRAFT');

  async function fetchArticles() {
    try {
      setLoading(true);
      const res = await api.get('/articles');
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  function resetForm() {
    setFormTitle('');
    setFormSummary('');
    setFormContent('');
    setFormCategory('MITIGASI BANJIR');
    setFormImage('');
    setFormStatus('DRAFT');
    setCurrentArticle(null);
  }

  async function handleAddArticle(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post('/articles', {
        title: formTitle,
        summary: formSummary,
        content: formContent,
        category: formCategory.toUpperCase(),
        image: formImage || undefined,
        status: formStatus,
      });
      setArticles([res.data, ...articles]);
      setIsAddOpen(false);
      resetForm();
    } catch (err) {
      alert('Gagal menambah artikel');
      console.error(err);
    }
  }

  function openEditModal(article: any) {
    setCurrentArticle(article);
    setFormTitle(article.title);
    setFormSummary(article.summary);
    setFormContent(article.content);
    setFormCategory(article.category.toUpperCase());
    setFormImage(article.image || '');
    setFormStatus(article.status);
    setIsEditOpen(true);
  }

  async function handleEditArticle(e: React.FormEvent) {
    e.preventDefault();
    if (!currentArticle) return;
    try {
      const res = await api.patch(`/articles/${currentArticle.id}`, {
        title: formTitle,
        summary: formSummary,
        content: formContent,
        category: formCategory.toUpperCase(),
        image: formImage || undefined,
        status: formStatus,
      });
      setArticles(articles.map(art => art.id === currentArticle.id ? res.data : art));
      setIsEditOpen(false);
      resetForm();
    } catch (err) {
      alert('Gagal memperbarui artikel');
      console.error(err);
    }
  }

  async function handleDeleteArticle(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter(art => art.id !== id));
    } catch (err) {
      alert('Gagal menghapus artikel');
      console.error(err);
    }
  }

  async function toggleStatus(article: any) {
    const newStatus = article.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await api.patch(`/articles/${article.id}`, {
        status: newStatus,
      });
      setArticles(articles.map(art => art.id === article.id ? res.data : art));
    } catch (err) {
      alert('Gagal mengubah status artikel');
      console.error(err);
    }
  }

  const getCategoryCount = (catName: string) => {
    if (catName === 'Semua Materi') return articles.length;
    return articles.filter((art) => art.category?.toUpperCase() === catName.toUpperCase()).length;
  };

  const filteredArticles = articles.filter((art) => {
    const title = art.title || '';
    const summary = art.summary || '';
    const content = art.content || '';
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          content.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = activeCategory === 'Semua Materi' || 
                            art.category?.toUpperCase() === activeCategory.toUpperCase();
                            
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Top Header Area */}
        <header className="flex items-center justify-between mb-12">
          <div className="relative w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari konten edukasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#E0F2FE]/50 border-none rounded-2xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-[#C8102E]/10"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={22} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#C8102E] rounded-full border-2 border-white" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <HelpCircle size={22} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            <span className="text-[14px] font-black text-slate-800">ALERTA CMS</span>
          </div>
        </header>

        {/* Title Area */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-[32px] font-black text-slate-800 tracking-tighter italic uppercase">
              Manajemen Konten Edukasi
            </h1>
            <p className="text-slate-500 font-medium">
              Kelola materi mitigasi bencana dan panduan keselamatan masyarakat.
            </p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsAddOpen(true); }}
            className="bg-[#C8102E] text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-red-200 hover:bg-[#b00e28] transition-all active:scale-[0.98]"
          >
            <Plus size={18} />
            Tambah Materi Baru
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar Content */}
          <div className="w-[280px] space-y-8">
            {/* Categories Card */}
            <div className="bg-[#E0F2FE]/30 rounded-[32px] p-6">
              <h3 className="text-[11px] font-black text-slate-400 tracking-widest uppercase mb-6 px-2">Kategori Materi</h3>
              <ul className="space-y-2">
                {initialCategories.map((catName) => {
                  const isActive = activeCategory === catName;
                  return (
                    <li key={catName}>
                      <button 
                        onClick={() => setActiveCategory(catName)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all",
                          isActive ? "bg-white text-[#C8102E] shadow-md font-bold" : "text-slate-600 hover:bg-white/50 font-medium"
                        )}
                      >
                        <span>{catName}</span>
                        <span className={cn(
                          "text-[10px] px-2 py-1 rounded-lg",
                          isActive ? "bg-[#C8102E] text-white" : "bg-slate-200 text-slate-500"
                        )}>
                          {getCategoryCount(catName)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Top View Content Card */}
            <div className="bg-[#1E293B] rounded-[32px] p-8 text-white">
              <h3 className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-8">Konten Paling Banyak Dilihat</h3>
              <div className="space-y-6 mb-8">
                {topContent.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <span className="text-[14px] font-black text-[#C8102E]">{item.id}</span>
                    <div>
                      <p className="text-[13px] font-bold text-slate-100">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.views}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 border border-slate-700 rounded-2xl text-[11px] font-black tracking-widest uppercase text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                Lihat Laporan Lengkap
              </button>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#C8102E]/30 border-t-[#C8102E] rounded-full animate-spin mb-4" />
                <span className="text-slate-500 font-bold">Memuat artikel edukasi...</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img 
                          src={article.image || 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400'} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg">
                          <span className="text-[9px] font-black text-white tracking-widest uppercase">
                            {article.status === 'PUBLISHED' ? 'VERIFIED' : 'DRAFT'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 pb-2">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-[#C8102E] tracking-widest uppercase">{article.category}</span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <h4 className="text-[16px] font-black text-slate-800 leading-tight mb-3 group-hover:text-[#C8102E] transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-[12px] text-slate-500 leading-relaxed font-medium line-clamp-3">
                          {article.summary}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-2">
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <button 
                          onClick={() => toggleStatus(article)}
                          className={cn(
                            "px-3 py-1 rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer font-black text-[9px] tracking-widest",
                            article.status === 'PUBLISHED' ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          )}
                        >
                          {article.status}
                        </button>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditModal(article)}
                            className="p-2 text-slate-400 hover:text-[#C8102E] hover:bg-slate-50 rounded-xl transition-all"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Card Placeholder */}
                <div 
                  onClick={() => { resetForm(); setIsAddOpen(true); }}
                  className="bg-white rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 group hover:border-[#C8102E]/30 transition-all cursor-pointer min-h-[380px]"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#C8102E]/5 transition-all">
                    <PlusCircle className="text-slate-300 group-hover:text-[#C8102E] transition-all" size={32} />
                  </div>
                  <p className="text-[15px] font-black text-slate-400 group-hover:text-slate-600 transition-all">Mulai Menulis Artikel Baru</p>
                  <p className="text-[11px] text-slate-400 mt-2 text-center">DRAF ANDA AKAN TERSIMPAN OTOMATIS</p>
                </div>
              </div>
            )}

            {/* Pagination Placeholder */}
            {!loading && filteredArticles.length > 0 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all"><ChevronLeft size={18} /></button>
                <button className="w-10 h-10 rounded-xl bg-[#C8102E] text-white font-bold shadow-lg shadow-red-100">1</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all"><ChevronRight size={18} /></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- ADD ARTICLE MODAL --- */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[999] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[640px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 italic uppercase">Tulis Materi Edukasi Baru</h3>
                <p className="text-sm text-slate-400 font-medium">Buat konten mitigasi bencana untuk masyarakat lokal</p>
              </div>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddArticle} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Judul Artikel</label>
                  <input 
                    type="text" 
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: Tanggap Gempa Bumi"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Kategori</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  >
                    <option value="MITIGASI BANJIR">Mitigasi Banjir</option>
                    <option value="PANDUAN GEMPA">Panduan Gempa</option>
                    <option value="KEBAKARAN HUTAN">Kebakaran Hutan</option>
                    <option value="TSUNAMI & ERUPSI">Tsunami & Erupsi</option>
                    <option value="UMUM">Umum</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">URL Gambar Cover</label>
                <input 
                  type="text" 
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Ringkasan Materi</label>
                <textarea 
                  required
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Deskripsi singkat atau ringkasan artikel..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Konten Lengkap</label>
                <textarea 
                  required
                  rows={5}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Tulis seluruh konten edukasi dan mitigasi bencana secara lengkap di sini..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="add_status" 
                      value="PUBLISHED" 
                      checked={formStatus === 'PUBLISHED'}
                      onChange={() => setFormStatus('PUBLISHED')}
                      className="accent-[#C8102E]"
                    />
                    <span className="text-xs font-bold text-slate-600">Publish Langsung</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="add_status" 
                      value="DRAFT" 
                      checked={formStatus === 'DRAFT'}
                      onChange={() => setFormStatus('DRAFT')}
                      className="accent-[#C8102E]"
                    />
                    <span className="text-xs font-bold text-slate-400">Simpan sebagai Draf</span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-5 py-3 border border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#C8102E] text-white rounded-2xl font-bold text-sm hover:bg-[#b00e28] shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                  >
                    Buat Materi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT ARTICLE MODAL --- */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[999] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[640px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 italic uppercase">Perbarui Materi Edukasi</h3>
                <p className="text-sm text-slate-400 font-medium">Ubah detail panduan keselamatan bencana</p>
              </div>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditArticle} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Judul Artikel</label>
                  <input 
                    type="text" 
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: Tanggap Gempa Bumi"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Kategori</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  >
                    <option value="MITIGASI BANJIR">Mitigasi Banjir</option>
                    <option value="PANDUAN GEMPA">Panduan Gempa</option>
                    <option value="KEBAKARAN HUTAN">Kebakaran Hutan</option>
                    <option value="TSUNAMI & ERUPSI">Tsunami & Erupsi</option>
                    <option value="UMUM">Umum</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">URL Gambar Cover</label>
                <input 
                  type="text" 
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Ringkasan Materi</label>
                <textarea 
                  required
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Deskripsi singkat atau ringkasan artikel..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Konten Lengkap</label>
                <textarea 
                  required
                  rows={5}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Tulis seluruh konten edukasi dan mitigasi bencana secara lengkap di sini..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="edit_status" 
                      value="PUBLISHED" 
                      checked={formStatus === 'PUBLISHED'}
                      onChange={() => setFormStatus('PUBLISHED')}
                      className="accent-[#C8102E]"
                    />
                    <span className="text-xs font-bold text-slate-600">Publish (Tampil di Mobile)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="edit_status" 
                      value="DRAFT" 
                      checked={formStatus === 'DRAFT'}
                      onChange={() => setFormStatus('DRAFT')}
                      className="accent-[#C8102E]"
                    />
                    <span className="text-xs font-bold text-slate-400">Draf (Sembunyikan)</span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-5 py-3 border border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#C8102E] text-white rounded-2xl font-bold text-sm hover:bg-[#b00e28] shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
