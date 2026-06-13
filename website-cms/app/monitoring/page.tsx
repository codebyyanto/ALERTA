'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Waves, 
  Flame, 
  ShieldAlert, 
  Wind,
  Compass, 
  Info,
  Navigation,
  AlertOctagon,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/DashboardLayout';

const initialMarkers = [
  { id: 1, type: 'flood', title: 'Banjir Bandang', location: 'Lampung Selatan', level: 'Awas', top: '65%', left: '48%', info: 'Kenaikan air sungai setinggi 40cm. Evakuasi sedang berlangsung.' },
  { id: 2, type: 'fire', title: 'Kebakaran Hutan', location: 'Lampung Barat', level: 'Siaga', top: '38%', left: '28%', info: 'Kebakaran semak belukar seluas 3 hektar. Pemadaman sedang berjalan.' },
  { id: 3, type: 'earthquake', title: 'Gempa Tektonik M 4.8', location: 'Pesisir Barat', level: 'Waspada', top: '75%', left: '15%', info: 'Guncangan kedalaman 10km. Tidak berpotensi tsunami.' },
  { id: 4, type: 'wind', title: 'Puting Beliung', location: 'Lampung Tengah', level: 'Waspada', top: '48%', left: '55%', info: 'Angin puting beliung merusak atap rumah. Penanganan BPBD.' },
];

const mockReports = [
  { id: 1, tag: 'BARU SAJA', title: 'Laporan Banjir: Lampung Selatan', content: 'Kenaikan debit air sungai meluap ke pemukiman setinggi 40-50cm...', isNew: true },
  { id: 2, tag: '15 MENIT LALU', title: 'Update Evakuasi: Pesisir Barat', content: 'Proses evakuasi warga terdampak getaran gempa di pesisir selesai dilakukan...', isNew: false },
];

export default function MonitoringPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="p-8 text-slate-800 flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="relative w-[360px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari wilayah atau koordinat..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EBF5FF]/50 border-none rounded-2xl py-3 pl-12 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
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

      </div>
    </DashboardLayout>
  );
}
