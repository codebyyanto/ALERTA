'use client';

import React from 'react';
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
  ShieldCheck,
  Eye,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Semua Materi', count: 42, active: true },
  { name: 'Mitigasi Banjir', count: 12 },
  { name: 'Panduan Gempa', count: 15 },
  { name: 'Kebakaran Hutan', count: 8 },
  { name: 'Tsunami & Erupsi', count: 7 },
];

const topContent = [
  { id: '01', title: 'Evakuasi Mandiri Sa...', views: '12.4k tayangan' },
  { id: '02', title: 'Persiapan Tas Siag...', views: '8.1k tayangan' },
  { id: '03', title: 'Nomor Darurat Nasi...', views: '6.7k tayangan' },
];

const articles = [
  {
    id: 1,
    tag: 'VERIFIED',
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400',
    category: 'MITIGASI BANJIR',
    time: '2j yang lalu',
    title: 'Langkah Darurat Saat Banjir Bandang Datang',
    summary: 'Panduan praktis evakuasi mandiri untuk warga yang...',
    status: 'PUBLISHED',
  },
  {
    id: 2,
    tag: 'DRAFT',
    image: 'https://images.unsplash.com/photo-1582213782179-a0c52e250e8a?auto=format&fit=crop&q=80&w=400',
    category: 'PANDUAN GEMPA',
    time: 'Kemarin',
    title: 'Memahami Segitiga Kehidupan (Triangle of Life)',
    summary: 'Analisis teknis mengenai struktur bangunan yang paling...',
    status: 'DRAFT',
  },
  {
    id: 3,
    tag: 'VERIFIED',
    image: 'https://images.unsplash.com/photo-1542350327-013b6b9e4307?auto=format&fit=crop&q=80&w=400',
    category: 'KEBAKARAN HUTAN',
    time: '3 hari lalu',
    title: 'Protokol Pembersihan Lahan Tanpa Bakar',
    summary: 'Panduan edukasi bagi petani mengenai teknik PLTB untuk...',
    status: 'PUBLISHED',
  },
  {
    id: 4,
    category: 'UMUM',
    time: '1 minggu lalu',
    image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=400',
    title: 'Manajemen Psikologis Pasca Bencana',
    summary: 'Artikel mengenai pentingnya pendampingan trauma healing...',
    status: 'PUBLISHED',
  },
];

export default function DashboardPage() {
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
          <button className="bg-[#C8102E] text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-red-200 hover:bg-[#b00e28] transition-all active:scale-[0.98]">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Plus size={16} />
            </div>
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
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <button className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all",
                      cat.active ? "bg-white text-[#C8102E] shadow-md font-bold" : "text-slate-600 hover:bg-white/50 font-medium"
                    )}>
                      <span>{cat.name}</span>
                      <span className={cn(
                        "text-[10px] px-2 py-1 rounded-lg",
                        cat.active ? "bg-[#C8102E] text-white" : "bg-slate-200 text-slate-500"
                      )}>{cat.count}</span>
                    </button>
                  </li>
                ))}
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
            <div className="grid grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {article.tag && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg">
                        <span className="text-[9px] font-black text-white tracking-widest">{article.tag}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-[#C8102E] tracking-widest">{article.category}</span>
                      <span className="text-[11px] text-slate-400 font-medium">{article.time}</span>
                    </div>
                    <h4 className="text-[16px] font-black text-slate-800 leading-tight mb-3 group-hover:text-[#C8102E] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium mb-6">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className={cn(
                        "px-3 py-1 rounded-lg",
                        article.status === 'PUBLISHED' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                      )}>
                        <span className="text-[9px] font-black tracking-widest">{article.status}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Edit3 size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Card Placeholder */}
              <div className="bg-white rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 group hover:border-[#C8102E]/30 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#C8102E]/5 transition-all">
                  <PlusCircle className="text-slate-300 group-hover:text-[#C8102E] transition-all" size={32} />
                </div>
                <p className="text-[15px] font-black text-slate-400 group-hover:text-slate-600 transition-all">Mulai Menulis Artikel Baru</p>
                <p className="text-[11px] text-slate-400 mt-2 text-center">DRAF ANDA AKAN TERSIMPAN OTOMATIS</p>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-3">
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all"><ChevronLeft size={18} /></button>
              <button className="w-10 h-10 rounded-xl bg-[#C8102E] text-white font-bold shadow-lg shadow-red-100">1</button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-bold transition-all">2</button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-bold transition-all">3</button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
