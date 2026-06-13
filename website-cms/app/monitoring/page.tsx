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
  const [activeCategories, setActiveCategories] = useState<string[]>(['flood', 'fire']);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  // Checkboxes are mapped to this state to show/hide overlays on the Lampung map

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

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[580px] flex-1">
          {/* Left Column (2 Cols): Map Container */}
          <div className="lg:col-span-2 relative bg-slate-100 rounded-[32px] overflow-hidden border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between">
            {/* Google Maps Embed iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1017325.2343940176!2d104.75782745!3d-5.26788255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dcc24e650ef3%3A0x1030bfbca7c8070!2sLampung!5e0!3m2!1sid!2sid!4v1718287000000!5m2!1sid!2sid" 
              className="w-full h-full border-none absolute inset-0 z-0 opacity-95 grayscale-[10%]" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />
            
            {/* Map Zoom Controls */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden border border-slate-100 bg-white p-1">
              <button className="w-9 h-9 flex items-center justify-center font-black text-[16px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors rounded-xl font-mono">+</button>
              <button className="w-9 h-9 flex items-center justify-center font-black text-[16px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 border-t border-slate-100 transition-colors rounded-xl font-mono">-</button>
            </div>

            {/* GPS Locate Control */}
            {/* Map Region Statistics Overlay */}
            <div className="absolute bottom-6 left-6 z-20 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.06)] min-w-[260px] pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-black text-slate-800 tracking-wide uppercase">Statistik Wilayah</span>
                <span className="bg-[#C8102E]/5 text-[#C8102E] text-[8px] font-black px-2 py-0.5 rounded tracking-wide uppercase">LAMPUNG</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <span className="text-[9px] font-black text-slate-400 tracking-wider uppercase">TERDAMPAK</span>
                  <p className="text-[16px] font-black text-slate-800 leading-none mt-1">1.240</p>
                  <span className="text-[8px] font-black text-red-500 block mt-1">▲ 12% Hari Ini</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <span className="text-[9px] font-black text-slate-400 tracking-wider uppercase">PENGUNGSI</span>
                  <p className="text-[16px] font-black text-slate-800 leading-none mt-1">3.412</p>
                  <span className="text-[8px] font-black text-emerald-500 block mt-1">● Stabil</span>
                </div>
              </div>
              
              {/* Logistics Progress Indicator */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span>Kebutuhan Logistik</span>
                  <span className="text-slate-800">78% Terpenuhi</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0D9488] rounded-full transition-all duration-500" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
            {/* Map Markers Overlays */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              
              {/* Wind Marker */}
              {activeCategories.includes('wind') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ top: '45%', left: '55%' }}
                  onMouseEnter={() => setHoveredMarker(4)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-slate-600 text-white flex items-center justify-center shadow-lg shadow-slate-950/30 border border-white/20">
                      <Wind size={16} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 4 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-4 shadow-xl min-w-[200px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Angin Puting Beliung</p>
                      <p className="text-xs font-bold text-slate-100">Lampung Tengah</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Status: WASPADA. Angin kencang merusak atap rumah warga.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Earthquake Marker */}
              {activeCategories.includes('earthquake') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ top: '70%', left: '15%' }}
                  onMouseEnter={() => setHoveredMarker(3)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-950/30 border border-white/20">
                      <ShieldAlert size={16} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 3 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-4 shadow-xl min-w-[200px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <p className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-1">Gempa Tektonik M 4.8</p>
                      <p className="text-xs font-bold text-slate-100">Pesisir Barat</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Status: WASPADA. Gempa tektonik kedalaman 10km.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Fire Marker */}
              {activeCategories.includes('fire') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ top: '35%', left: '28%' }}
                  onMouseEnter={() => setHoveredMarker(2)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-pulse pointer-events-none" />
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-950/30 border border-white/20">
                      <Flame size={16} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 2 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-4 shadow-xl min-w-[200px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <p className="text-[10px] font-black text-amber-400 tracking-widest uppercase mb-1">Kebakaran Hutan</p>
                      <p className="text-xs font-bold text-slate-100">Lampung Barat</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Status: SIAGA. Kebakaran semak belukar seluas 3 hektar.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Flood Marker */}
              {activeCategories.includes('flood') && (
                <div 
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ top: '55%', left: '46%' }}
                  onMouseEnter={() => setHoveredMarker(1)}
                  onMouseLeave={() => setHoveredMarker(null)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#C8102E]/30 animate-ping pointer-events-none" />
                    <div className="w-9 h-9 rounded-full bg-[#C8102E] text-white flex items-center justify-center shadow-lg shadow-red-950/30 border border-white/20">
                      <Waves size={16} />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredMarker === 1 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white rounded-2xl p-4 shadow-xl min-w-[200px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <p className="text-[10px] font-black text-red-400 tracking-widest uppercase mb-1">Banjir Bandang</p>
                      <p className="text-xs font-bold text-slate-100">Lampung Selatan</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Status: AWAS. Kenaikan debit air meluap setinggi 40cm.</p>
                    </div>
                  )}
                </div>
              )}

            </div>
            <div className="absolute top-32 left-6 z-20 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden border border-slate-100 bg-white p-1">
              <button className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors rounded-xl">
                <Compass size={18} />
              </button>
            </div>
          </div>
          
          {/* Right Column (1 Col): Right Side Panel */}
          <div className="flex flex-col gap-6">
            
            {/* Disaster Categories Card */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-4">
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1 px-1">KATEGORI BENCANA</span>
              
              <div className="space-y-2">
                {/* Banjir (Flood) Category */}
                <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center">
                      <Waves size={16} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-800 leading-none">Banjir</p>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 block">24 Titik Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center">
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
                    <div className="w-5 h-5 rounded-lg border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>

                {/* Kebakaran (Fire) Category */}
                <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Flame size={16} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-800 leading-none">Kebakaran</p>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 block">2 Titik Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center">
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
                    <div className="w-5 h-5 rounded-lg border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>

                {/* Gempa Bumi (Earthquake) Category */}
                <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShieldAlert size={16} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-800 leading-none">Gempa Bumi</p>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 block">0 Titik Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center">
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
                    <div className="w-5 h-5 rounded-lg border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>

                {/* Angin Kencang (Wind) Category */}
                <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                      <Wind size={16} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-800 leading-none">Angin Kencang</p>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1 block">8 Titik Aktif</span>
                    </div>
                  </div>
                  {/* Custom checkbox */}
                  <div className="relative flex items-center justify-center">
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
                    <div className="w-5 h-5 rounded-lg border border-slate-200 peer-checked:bg-[#C8102E] peer-checked:border-[#C8102E] flex items-center justify-center transition-all">
                      <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Latest Disaster Reports Card */}
            <div className="bg-[#F8FAFC] rounded-[32px] p-6 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.005)] flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-4 px-1 block">LAPORAN TERBARU</span>
                
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.01)] relative overflow-hidden">
                      {report.isNew && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8102E]" />
                      )}
                      <span className={cn(
                        "text-[8px] font-black tracking-widest uppercase",
                        report.isNew ? "text-[#C8102E]" : "text-slate-400"
                      )}>
                        {report.tag}
                      </span>
                      <h5 className="text-[12px] font-bold text-slate-800 leading-snug mt-1">{report.title}</h5>
                      <p className="text-[11px] text-slate-400 leading-normal mt-1 font-medium">{report.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full py-4 bg-[#C8102E] hover:bg-[#b00e28] text-white rounded-2xl text-[11px] font-black tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-200 active:scale-[0.98] transition-all">
                  <AlertOctagon size={16} />
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
