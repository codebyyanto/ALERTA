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
  { id: 1, type: 'flood', title: 'Banjir Bandang', location: 'Lampung Selatan', level: 'Awas', top: '55%', left: '46%', info: 'Kenaikan air sungai setinggi 40cm. Evakuasi sedang berlangsung.' },
  { id: 2, type: 'fire', title: 'Kebakaran Hutan', location: 'Lampung Barat', level: 'Siaga', top: '35%', left: '28%', info: 'Kebakaran semak belukar seluas 3 hektar. Pemadaman sedang berjalan.' },
  { id: 3, type: 'earthquake', title: 'Gempa Tektonik M 4.8', location: 'Pesisir Barat', level: 'Waspada', top: '70%', left: '15%', info: 'Guncangan kedalaman 10km. Tidak berpotensi tsunami.' },
  { id: 4, type: 'wind', title: 'Puting Beliung', location: 'Lampung Tengah', level: 'Waspada', top: '45%', left: '55%', info: 'Angin puting beliung merusak atap rumah. Penanganan BPBD.' },
];

const mockReports = [
  { id: 1, tag: 'BARU SAJA', title: 'Laporan Banjir: Kelapa Gading', content: 'Warga melaporkan kenaikan debit air setinggi 40cm di jalan protokol...', isNew: true },
  { id: 2, tag: '15 MENIT LALU', title: 'Update Evakuasi: Cilitan', content: 'Proses evakuasi lansia telah selesai dilakukan oleh tim SAR...', isNew: false },
];

/* ALERTA Disaster Response Monitoring Center Lampung Area */
export default function MonitoringPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>(['flood', 'fire']);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  // Checkboxes are mapped to this state to show/hide overlays on the Lampung map

  return (
    <DashboardLayout>
      <div className="p-6 text-slate-800 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="relative w-[360px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari wilayah atau koordinat..." 
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

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Left Column (2 Cols): Map Container Card */}
          <div className="lg:col-span-2 relative bg-slate-50 rounded-[32px] overflow-hidden border border-slate-200/50 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex flex-col justify-between h-[540px]">
            
            {/* Google Maps Embed iframe (Bottom height padding for warning banner) */}
            <div className="absolute inset-0 z-0 bottom-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1017325.2343940176!2d104.75782745!3d-5.26788255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dcc24e650ef3%3A0x1030bfbca7c8070!2sLampung!5e0!3m2!1sid!2sid!4v1718287000000!5m2!1sid!2sid" 
                className="w-full h-full border-none grayscale-[10%]" 
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Map Zoom Controls */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 shadow-[0_4px_10px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden border border-slate-100 bg-white p-1">
              <button className="w-8 h-8 flex items-center justify-center font-black text-[14px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors rounded-xl font-mono">+</button>
              <button className="w-8 h-8 flex items-center justify-center font-black text-[14px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 border-t border-slate-100 transition-colors rounded-xl font-mono">-</button>
            </div>

            {/* GPS Locate Control */}
            <div className="absolute top-26 left-4 z-20 shadow-[0_4px_10px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden border border-slate-100 bg-white p-1">
              <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors rounded-xl">
                <Compass size={16} />
              </button>
            </div>

            {/* Map Markers Overlays (Restricted to bottom-12 to align above warning banner) */}
            <div className="absolute inset-0 z-10 bottom-12 pointer-events-none">
              
              {/* Wind Marker */}
              {activeCategories.includes('wind') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '45%', left: '55%' }}
                  onMouseEnter={() => setHoveredMarker(4)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center shadow-lg shadow-slate-950/30 border border-white/20">
                      <Wind size={14} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 4 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-3 shadow-xl min-w-[180px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
                      <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-0.5">Angin Puting Beliung</p>
                      <p className="text-[11px] font-bold text-slate-100">Lampung Tengah</p>
                      <p className="text-[9px] text-slate-400 leading-normal mt-1">Status: WASPADA. Angin kencang merusak atap rumah warga.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Earthquake Marker */}
              {activeCategories.includes('earthquake') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '70%', left: '15%' }}
                  onMouseEnter={() => setHoveredMarker(3)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-950/30 border border-white/20">
                      <ShieldAlert size={14} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 3 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-3 shadow-xl min-w-[180px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
                      <p className="text-[9px] font-black text-blue-400 tracking-widest uppercase mb-0.5">Gempa Tektonik M 4.8</p>
                      <p className="text-[11px] font-bold text-slate-100">Pesisir Barat</p>
                      <p className="text-[9px] text-slate-400 leading-normal mt-1">Status: WASPADA. Gempa tektonik kedalaman 10km.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Fire Marker */}
              {activeCategories.includes('fire') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '35%', left: '28%' }}
                  onMouseEnter={() => setHoveredMarker(2)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full bg-amber-500/30 animate-pulse pointer-events-none" />
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-950/30 border border-white/20">
                      <Flame size={14} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 2 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-3 shadow-xl min-w-[180px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
                      <p className="text-[9px] font-black text-amber-400 tracking-widest uppercase mb-0.5">Kebakaran Hutan</p>
                      <p className="text-[11px] font-bold text-slate-100">Lampung Barat</p>
                      <p className="text-[9px] text-slate-400 leading-normal mt-1">Status: SIAGA. Kebakaran semak belukar seluas 3 hektar.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Flood Marker */}
              {activeCategories.includes('flood') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ top: '55%', left: '46%' }}
                  onMouseEnter={() => setHoveredMarker(1)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full bg-[#C8102E]/30 animate-ping pointer-events-none" />
                    <div className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center shadow-lg shadow-red-950/30 border border-white/20">
                      <Waves size={14} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 1 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-3 shadow-xl min-w-[180px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
                      <p className="text-[9px] font-black text-red-400 tracking-widest uppercase mb-0.5">Banjir Bandang</p>
                      <p className="text-[11px] font-bold text-slate-100">Lampung Selatan</p>
                      <p className="text-[9px] text-slate-400 leading-normal mt-1">Status: AWAS. Kenaikan debit air meluap setinggi 40cm.</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Map Region Statistics Overlay (Resting cleanly above the warning bar) */}
            <div className="absolute bottom-16 left-4 z-20 bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.06)] min-w-[240px] pointer-events-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-800 tracking-wide uppercase">Statistik Wilayah</span>
                <span className="bg-[#C8102E]/5 text-[#C8102E] text-[8px] font-black px-2 py-0.5 rounded tracking-wide uppercase">LAMPUNG</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 tracking-wider uppercase">TERDAMPAK</span>
                  <p className="text-[14px] font-black text-slate-800 leading-none mt-1">1.240</p>
                  <span className="text-[8px] font-black text-red-500 block mt-1">▲ 12% Hari Ini</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 tracking-wider uppercase">PENGUNGSI</span>
                  <p className="text-[14px] font-black text-slate-800 leading-none mt-1">3.412</p>
                  <span className="text-[8px] font-black text-emerald-500 block mt-1">● Stabil</span>
                </div>
              </div>
              
              {/* Logistics Progress Indicator */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                  <span>Kebutuhan Logistik</span>
                  <span className="text-slate-800">78% Terpenuhi</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0D9488] rounded-full transition-all duration-500" style={{ width: '78%' }} />
                </div>
              </div>
            </div>

            {/* Running Text Banner Warning (Placed perfectly at the bottom edge of the map card) */}
            <div className="h-12 bg-[#C8102E] text-white flex items-center gap-4 relative z-10 shrink-0 px-4 border-t border-red-700/30">
              <div className="bg-red-950/20 text-[8px] font-black tracking-widest px-2.5 py-1 rounded shrink-0 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                WARNING
              </div>
              <div className="flex-1 overflow-hidden relative font-black text-[10px] tracking-wide uppercase whitespace-nowrap">
                <div className="inline-block" style={{ animation: 'marquee-scroll 25s linear infinite' }}>
                  PERINGATAN DINI: Waspada cuaca ekstrem curah hujan lebat disertai kilat dan angin kencang di wilayah Lampung Selatan, Pringsewu, Pesawaran, dan Bandar Lampung. — BPBD Provinsi Lampung bersiaga di titik rawan longsor dan banjir bandang.
                </div>
                
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes marquee-scroll {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                  }
                ` }} />
              </div>
            </div>
            
          </div>
          
          {/* Right Column (1 Col): Right Side Panel */}
          <div className="flex flex-col gap-6 h-[540px] justify-between">
            
            {/* Disaster Categories Card */}
            <div className="bg-white rounded-[32px] p-5 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-3">
              <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-0.5 px-1">KATEGORI BENCANA</span>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Banjir (Flood) Category */}
                <label className={cn(
                  "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border cursor-pointer transition-all",
                  activeCategories.includes('flood') ? "border-red-100 bg-red-50/10" : "border-slate-100"
                )}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0">
                      <Waves size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 leading-none truncate">Banjir</p>
                      <span className="text-[8px] font-bold text-red-500 mt-1 block">24 Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <input 
                      type="checkbox" 
                      checked={activeCategories.includes('flood')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setActiveCategories([...activeCategories, 'flood']);
                        } else {
                          setActiveCategories(activeCategories.filter(c => c !== 'flood'));
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded-md border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={10} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>

                {/* Kebakaran (Fire) Category */}
                <label className={cn(
                  "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border cursor-pointer transition-all",
                  activeCategories.includes('fire') ? "border-amber-100 bg-amber-50/10" : "border-slate-100"
                )}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Flame size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 leading-none truncate">Kebakaran</p>
                      <span className="text-[8px] font-bold text-amber-600 mt-1 block">2 Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <input 
                      type="checkbox" 
                      checked={activeCategories.includes('fire')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setActiveCategories([...activeCategories, 'fire']);
                        } else {
                          setActiveCategories(activeCategories.filter(c => c !== 'fire'));
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded-md border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={10} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>

                {/* Gempa Bumi (Earthquake) Category */}
                <label className={cn(
                  "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border cursor-pointer transition-all",
                  activeCategories.includes('earthquake') ? "border-blue-100 bg-blue-50/10" : "border-slate-100"
                )}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <ShieldAlert size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 leading-none truncate">Gempa</p>
                      <span className="text-[8px] font-bold text-slate-400 mt-1 block">0 Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <input 
                      type="checkbox" 
                      checked={activeCategories.includes('earthquake')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setActiveCategories([...activeCategories, 'earthquake']);
                        } else {
                          setActiveCategories(activeCategories.filter(c => c !== 'earthquake'));
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded-md border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={10} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>

                {/* Angin Kencang (Wind) Category */}
                <label className={cn(
                  "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border cursor-pointer transition-all",
                  activeCategories.includes('wind') ? "border-slate-200 bg-slate-100/10" : "border-slate-100"
                )}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                      <Wind size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 leading-none truncate">Angin</p>
                      <span className="text-[8px] font-bold text-slate-400 mt-1 block">8 Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <input 
                      type="checkbox" 
                      checked={activeCategories.includes('wind')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setActiveCategories([...activeCategories, 'wind']);
                        } else {
                          setActiveCategories(activeCategories.filter(c => c !== 'wind'));
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded-md border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={10} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Latest Disaster Reports Card */}
            <div className="bg-[#F8FAFC] rounded-[32px] p-5 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.005)] flex-1 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-3.5 px-1 block">LAPORAN TERBARU</span>
                
                <div className="space-y-3">
                  {mockReports.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] relative overflow-hidden">
                      {report.isNew && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8102E]" />
                      )}
                      <span className={cn(
                        "text-[8px] font-black tracking-widest uppercase",
                        report.isNew ? "text-[#C8102E]" : "text-slate-400"
                      )}>
                        {report.tag}
                      </span>
                      <h5 className="text-[11px] font-bold text-slate-800 leading-snug mt-0.5">{report.title}</h5>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5 font-medium">{report.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <button className="w-full py-3 bg-[#C8102E] hover:bg-[#b00e28] text-white rounded-2xl text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-lg shadow-red-200 active:scale-[0.98] transition-all">
                  <AlertOctagon size={14} />
                  BUAT ALERT BARU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
