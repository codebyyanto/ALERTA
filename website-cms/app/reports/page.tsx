'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Filter, 
  Download, 
  Waves, 
  Flame, 
  ShieldAlert, 
  Wind,
  Check,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/DashboardLayout';

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="p-6 text-slate-800 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="relative w-[360px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari laporan, ID, atau lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EBF5FF]/50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[12px] font-black text-slate-800 tracking-wider flex items-center gap-1.5">
              ALERTA CMS
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="bg-red-50 text-[#C8102E] text-[8px] font-black px-1.5 py-0.5 rounded uppercase">LIVE</span>
            </span>
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#C8102E] rounded-full border border-white" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Laporan */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mb-1">TOTAL LAPORAN</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-black text-slate-900 leading-none">
                1.284
              </span>
              <span className="text-[10px] font-black text-emerald-500">+12%</span>
            </div>
          </div>
        </div>

        {/* Title and Top Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Manajemen Laporan</h1>
            <p className="text-[13px] text-slate-500 font-medium mt-1">Pantau dan verifikasi setiap laporan kejadian dari masyarakat secara real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 rounded-2xl px-4 py-2.5 text-[13px] font-bold shadow-sm hover:bg-slate-50 hover:text-slate-800 transition-colors">
              <Filter size={16} />
              Filter Lanjutan
            </button>
            <button className="flex items-center gap-2 bg-[#C8102E] text-white rounded-2xl px-4 py-2.5 text-[13px] font-bold shadow-sm hover:bg-[#A30D24] transition-colors">
              <Download size={16} />
              Ekspor Laporan
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
