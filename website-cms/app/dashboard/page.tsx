'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Users2, 
  MapPin, 
  Clock, 
  ChevronRight,
  Megaphone,
  Send,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/DashboardLayout';

const mockDailyTrend = [
  { date: '01 OCT', count: 18 },
  { date: '05 OCT', count: 24 },
  { date: '10 OCT', count: 15 },
  { date: '15 OCT', count: 42 },
  { date: '20 OCT', count: 28 },
  { date: '25 OCT', count: 20 },
  { date: '30 OCT', count: 32 },
];

const mockMonthlyTrend = [
  { date: 'MEI', count: 210 },
  { date: 'JUN', count: 340 },
  { date: 'JUL', count: 480 },
  { date: 'AGU', count: 310 },
  { date: 'SEP', count: 520 },
  { date: 'OKT', count: 680 },
];

const mockActivities = [
  { id: 1, name: 'Agus Pratama', action: 'Memulai verifikasi lapangan di zona B-12 Semarang.', time: '3 MENIT LALU', avatar: 'AP' },
  { id: 2, name: 'Siti Aminah', action: 'Mengunggah 4 foto terbaru dari lokasi longsor Bogor.', time: '12 MENIT LALU', avatar: 'SA' },
  { id: 3, name: 'Linda Wijaya', action: 'Menyelesaikan distribusi logistik di Posko 01 Riau.', time: '45 MENIT LALU', avatar: 'LW' },
];

const mockReports = [
  { id: 1, reporter: 'Andi Saputra', type: 'Banjir Bandang', location: 'Semarang, Jateng', time: '2 Menit Lalu', status: 'MENUNGGU', initials: 'AS' },
  { id: 2, reporter: 'Rina Marlina', type: 'Tanah Longsor', location: 'Bogor, Jabar', time: '15 Menit Lalu', status: 'TERVERIFIKASI', initials: 'RM' },
  { id: 3, reporter: 'Dedi Wijaya', type: 'Kebakaran Hutan', location: 'Pekanbaru, Riau', time: '1 Jam Lalu', status: 'DIPROSES', initials: 'DW' },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<'DAILY' | 'MONTHLY'>('DAILY');

  return (
    <DashboardLayout>
      <div className="p-8 text-slate-800">
        {/* Header */}
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1: TOTAL REPORTS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[135px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-1">TOTAL REPORTS</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">2,450</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <FileText size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
              <TrendingUp size={14} />
              <span>+12% vs last month</span>
            </div>
          </div>

          {/* Card 2: ACTIVE DISASTERS */}
          <div className="bg-[#C8102E] rounded-3xl p-6 text-white shadow-[0_10px_25px_rgba(200,16,46,0.15)] flex flex-col justify-between min-h-[135px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-white/75 tracking-wider uppercase mb-1">ACTIVE DISASTERS</p>
                <h3 className="text-3xl font-black tracking-tight">12</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <AlertTriangle size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>URGENT STATUS ACTIVE</span>
            </div>
          </div>

          {/* Card 3: VERIFIED REPORTS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[135px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-1">VERIFIED REPORTS</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">1,800</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] text-slate-500 font-bold">
              <span className="text-[#0D9488] flex items-center gap-0.5">✓ 73%</span>
              <span className="text-slate-400 font-medium">Conversion rate</span>
            </div>
          </div>

          {/* Card 4: ACTIVE VOLUNTEERS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[135px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase mb-1">ACTIVE VOLUNTEERS</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">842</h3>
              </div>

        {/* Main Sections: Chart & Volunteer Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Tren Kejadian Bencana Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-[16px] font-black text-slate-800 uppercase tracking-tight">Tren Kejadian Bencana</h4>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Laporan harian dalam 30 hari terakhir</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shrink-0">
                  <button 
                    onClick={() => setTimeframe('MONTHLY')}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-[9px] font-black tracking-wider transition-all",
                      timeframe === 'MONTHLY' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    MONTHLY
                  </button>
                  <button 
                    onClick={() => setTimeframe('DAILY')}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-[9px] font-black tracking-wider transition-all",
                      timeframe === 'DAILY' ? "bg-[#C8102E] text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    DAILY
                  </button>
                </div>
              </div>
              
              {/* Custom SVG Bar Chart */}
              <div className="h-60 mt-8 flex items-end justify-between relative">
                {/* Horizontal Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                  <div className="w-full border-t border-slate-50" />
                  <div className="w-full border-t border-slate-50" />
                  <div className="w-full border-t border-slate-50" />
                  <div className="w-full border-t border-slate-50" />
                </div>
                
                {/* Bars rendering */}
                <div className="w-full h-[88%] flex items-end justify-between z-10 pt-4 pb-1">
                  {(timeframe === 'DAILY' ? mockDailyTrend : mockMonthlyTrend).map((item, idx) => {
                    const maxVal = Math.max(...(timeframe === 'DAILY' ? mockDailyTrend.map(d => d.count) : mockMonthlyTrend.map(m => m.count)));
                    const heightPercent = `${(item.count / maxVal) * 88}%`;
                    const isPeak = timeframe === 'DAILY' ? item.count === 42 : item.date === 'OKT';
                    
                    return (
                      <div key={item.date} className="flex-1 flex flex-col items-center group/bar cursor-pointer h-full justify-end px-2">
                        <div 
                          style={{ height: heightPercent }}
                          className={cn(
                            "w-full rounded-t-lg transition-all duration-500 relative min-h-[4px]",
                            isPeak ? "bg-[#C8102E] shadow-[0_4px_12px_rgba(200,16,46,0.2)]" : "bg-[#FCA5A5] hover:bg-[#F87171]"
                          )}
                        >
                          {/* Floating Tooltip on Hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-[9px] font-black py-1 px-2.5 rounded shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-25">
                            {item.count} Laporan
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-slate-400 tracking-wider mt-3.5 whitespace-nowrap">{item.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Volunteer Activity Log Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-[16px] font-black text-slate-800 uppercase tracking-tight">Aktivitas Relawan</h4>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Log aktivitas terkini</p>
                </div>
                <Users className="text-[#C8102E]" size={20} />
              </div>
              
              {/* Volunteer activity list container */}
              <div className="relative pl-6 space-y-6">
                {/* Timeline connector line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
                
                {mockActivities.map((item) => (
                  <div key={item.id} className="relative flex gap-4">
                    {/* Circle timeline dot */}
                    <div className="absolute -left-[20px] top-2 w-2 h-2 rounded-full bg-[#C8102E] border-2 border-white ring-4 ring-red-50 z-10" />
                    
                    <div className="flex-1 flex gap-3 min-w-0">
                      {/* Avatar initials placeholder */}
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0 shadow-sm",
                        item.name.startsWith('Agus') && "bg-[#E0F2FE] text-[#0369A1]",
                        item.name.startsWith('Siti') && "bg-[#FEF3C7] text-[#B45309]",
                        item.name.startsWith('Linda') && "bg-[#E0F2FE] text-[#0D9488]"
                      )}>
                        {item.avatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-slate-800 leading-snug">{item.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">{item.action}</p>
                        <span className="text-[9px] font-black text-[#C8102E] uppercase tracking-wider block mt-1.5">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Button Container */}
            <div className="mt-6">
              <button className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/50 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 active:scale-[0.98]">
                BUKA PANEL RELAWAN
              </button>
            </div>

        {/* Bottom Section: Laporan Terbaru & Quick Response */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Laporan Terbaru Table */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-[16px] font-black text-slate-800 uppercase tracking-tight">Laporan Terbaru</h4>
              </div>
              <button className="text-[10px] font-black text-[#C8102E] hover:text-[#b00e28] tracking-widest uppercase transition-colors">
                LIHAT SEMUA
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="pb-4 text-[9px] font-black text-slate-400 tracking-wider uppercase">PELAPOR</th>
                    <th className="pb-4 text-[9px] font-black text-slate-400 tracking-wider uppercase">JENIS KEJADIAN</th>
                    <th className="pb-4 text-[9px] font-black text-slate-400 tracking-wider uppercase">LOKASI</th>
                    <th className="pb-4 text-[9px] font-black text-slate-400 tracking-wider uppercase">WAKTU</th>
                    <th className="pb-4 text-[9px] font-black text-slate-400 tracking-wider uppercase text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Rows */}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Right: Quick Response Place */}
        </div>
          </div>
        </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] text-slate-500 font-bold">
              <Users2 size={14} className="text-blue-500" />
              <span>24 New onboarding today</span>
            </div>
          </div>
        </div>
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-[360px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari laporan atau relawan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EBF5FF]/50 border-none rounded-2xl py-3 pl-12 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[12px] font-black text-slate-800 tracking-wider flex items-center gap-1.5">
              ALERTA CMS
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
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
      </div>
    </DashboardLayout>
  );
}
