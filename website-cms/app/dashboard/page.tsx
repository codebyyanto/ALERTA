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

  return (
    <DashboardLayout>
      <div className="p-8 text-slate-800">
        {/* Header */}
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
