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
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'banjir':
        return <Waves size={14} />;
      case 'kebakaran':
        return <Flame size={14} />;
      case 'gempa':
        return <ShieldAlert size={14} />;
      default:
        return <Wind size={14} />;
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'kebakaran':
        return 'bg-red-50 text-red-600 border border-red-100';
      case 'banjir':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'gempa':
        return 'bg-slate-50 text-slate-600 border border-slate-100';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState<'ALL' | 'MENUNGGU' | 'TERVERIFIKASI' | 'DITOLAK'>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        {/* Table & Pagination Wrapper */}
        <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.005)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 tracking-widest uppercase bg-slate-50/50">
                  <th className="py-4 px-6">ID LAPORAN</th>
                  <th className="py-4 px-6">PELAPOR</th>
                  <th className="py-4 px-6">KATEGORI</th>
                  <th className="py-4 px-6">LOKASI</th>
                  <th className="py-4 px-6">WAKTU</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
{loading && (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-100 rounded-lg w-16" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100" />
                          <div className="h-4 bg-slate-100 rounded-lg w-24" />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-6 bg-slate-100 rounded-xl w-20" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-100 rounded-lg w-32" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-100 rounded-lg w-20" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-6 bg-slate-100 rounded-xl w-24" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-8 bg-slate-100 rounded-xl w-16 mx-auto" />
                      </td>
                    </tr>
                  ))
                )}
                {!loading && reports.length > 0 && reports.map((report) => (
                  <tr key={report.id} className="text-[12px] font-semibold text-slate-700 hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 font-black text-slate-800">#REP-{report.id.substring(0, 4)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EBF5FF] text-blue-600 font-bold flex items-center justify-center text-[10px]">
                          {report.reporterName.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-900">{report.reporterName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wide flex items-center gap-1.5 w-fit",
                        getCategoryClass(report.category)
                      )}>
                        {getCategoryIcon(report.category)}
                        {report.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">{report.location}</td>
                    <td className="py-4 px-6 text-slate-500 font-medium">{report.time}</td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wide w-fit block",
                        report.status === 'TERVERIFIKASI' ? 'bg-emerald-50 text-emerald-600' :
                        report.status === 'DITOLAK' ? 'bg-red-50 text-red-600' : 'bg-blue-50/50 text-slate-500 border border-slate-100'
                      )}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && (error || reports.length === 0) && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangle size={32} className="text-slate-300" />
                        <p className="text-[13px] font-bold text-slate-400">
                          {error ? 'Gagal memuat data laporan dari API' : 'Belum ada laporan masuk dari aplikasi mobile'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && reports.length > 0 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-50 text-[11px] font-bold text-slate-500">
              <span>Menampilkan {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, stats?.total || 0)} dari {(stats?.total || 0).toLocaleString()} laporan</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={cn(
                      "w-7 h-7 rounded-lg font-black transition-all",
                      currentPage === idx + 1 
                        ? "bg-[#C8102E] text-white" 
                        : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtering Tabs */}
        <div className="border-b border-slate-100 flex gap-6 text-[13px] font-black">
          {(['ALL', 'MENUNGGU', 'TERVERIFIKASI', 'DITOLAK'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={cn(
                "pb-3.5 transition-all relative border-b-2 uppercase tracking-wider",
                currentTab === tab 
                  ? "border-[#C8102E] text-[#C8102E]" 
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              {tab === 'ALL' ? 'Semua Laporan' : tab === 'MENUNGGU' ? 'Menunggu Verifikasi' : tab === 'TERVERIFIKASI' ? 'Terverifikasi' : 'Ditolak'}
            </button>
          ))}
        </div>

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

          {/* Menunggu Verifikasi */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mb-1">MENUNGGU VERIFIKASI</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-black text-[#C8102E] leading-none">
                42
              </span>
              <span className="bg-red-50 text-[#C8102E] text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase">Urgent</span>
            </div>
          </div>

          {/* Terverifikasi */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mb-1">TERVERIFIKASI</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-black text-slate-900 leading-none">
                1.156
              </span>
              <span className="text-[10px] font-black text-blue-500">92%</span>
            </div>
          </div>

          {/* Rata-Rata Respon */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mb-1">RATA-RATA RESPON</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-black text-slate-900 leading-none">
                14m
              </span>
              <span className="text-[10px] font-black text-emerald-500">-2m</span>
            </div>
          </div>

          {/* Verification Log Card (1 Col) */}
          <div className="bg-[#1E293B] text-white rounded-[32px] p-6 border border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between h-[360px]">
            <div>
              <h3 className="text-[14px] font-black tracking-wide uppercase mb-4 text-slate-100">Catatan Verifikasi</h3>
              <div className="space-y-4">
                {/* Alert details */}
              </div>
            </div>
            {/* Button action */}
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
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Heatmap Card (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-950 text-white rounded-[32px] p-6 border border-slate-900 shadow-[0_4px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between h-[360px] relative overflow-hidden">
            <div className="z-10">
              <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">SEBARAN HOTSPOT LAPORAN</span>
              <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase mt-0.5">LIVE UPDATES - JAKARTA AREA</p>
            </div>
            {/* Ripple Heatmap Graphics */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <span className="absolute text-[24px] font-black text-white tracking-wide mix-blend-overlay z-20">Laporan</span>
                
                {/* Outer Ripple */}
                <div className="absolute w-[260px] h-[200px] rounded-full border border-yellow-500/20 bg-yellow-500/5 animate-pulse" />
                {/* Mid Ripple */}
                <div className="absolute w-[200px] h-[150px] rounded-full border border-orange-500/30 bg-orange-500/10 animate-pulse delay-75" />
                {/* Inner Ripple */}
                <div className="absolute w-[140px] h-[100px] rounded-full border border-red-500/40 bg-red-500/20 animate-pulse delay-150" />
                {/* Core Hotspot */}
                <div className="absolute w-4 h-4 rounded-full bg-[#C8102E] border-2 border-white shadow-lg z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
