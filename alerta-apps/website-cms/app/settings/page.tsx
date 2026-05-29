'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Globe,
  Sliders,
  ShieldCheck,
  Bell,
  HelpCircle,
  Save,
  Volume2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

type TabType = 'general' | 'alerts' | 'security';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // General Settings State
  const [appName, setAppName] = useState('');
  const [institution, setInstitution] = useState('');
  const [hotline, setHotline] = useState('');
  const [emailSupport, setEmailSupport] = useState('');

  // Alerts Settings State
  const [maxAlertRadius, setMaxAlertRadius] = useState(15);
  const [alertNotification, setAlertNotification] = useState('ALL');
  const [notificationSound, setNotificationSound] = useState('emergency_siren');

  // Security & System Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState(true);

  // Fetch settings from API
  async function fetchSettings() {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      const data = res.data;

      setAppName(data.appName || 'ALERTA');
      setInstitution(data.institution || '');
      setHotline(data.hotline || '');
      setEmailSupport(data.emailSupport || '');

      setMaxAlertRadius(data.maxAlertRadius !== undefined ? data.maxAlertRadius : 15);
      setAlertNotification(data.alertNotification || 'ALL');
      setNotificationSound(data.notificationSound || 'emergency_siren');

      setMaintenanceMode(data.maintenanceMode || false);
      setAllowRegistration(data.allowRegistration !== undefined ? data.allowRegistration : true);
      setGoogleAuthEnabled(data.googleAuthEnabled !== undefined ? data.googleAuthEnabled : true);
    } catch (err) {
      console.error('Error fetching settings:', err);
      showToast('Gagal memuat pengaturan sistem', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }

  // Handle Save
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      await api.patch('/settings', {
        appName,
        institution,
        hotline,
        emailSupport,
        maxAlertRadius,
        alertNotification,
        notificationSound,
        maintenanceMode,
        allowRegistration,
        googleAuthEnabled,
      });
      showToast('Pengaturan sistem berhasil disimpan secara permanen!');
    } catch (err) {
      console.error('Error saving settings:', err);
      showToast('Gagal menyimpan pengaturan sistem', 'error');
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: 'general', label: 'Identitas Aplikasi', icon: Globe, desc: 'Nama aplikasi, organisasi, kontak, dan bantuan.' },
    { id: 'alerts', label: 'Siaga & Notifikasi', icon: Sliders, desc: 'Radius siaga bencana, tingkat bahaya, dan audio alarm.' },
    { id: 'security', label: 'Sistem & Akses', icon: ShieldCheck, desc: 'Mode pemeliharaan, registrasi user, dan integrasi OAuth.' },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-[1200px] mx-auto min-h-screen relative pb-24">
        {/* Top Header Area */}
        <header className="flex items-center justify-between mb-12">
          <div className="text-slate-400 text-sm font-medium">
            Pengaturan &gt; Sistem
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
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-[32px] font-black text-slate-800 tracking-tighter italic uppercase">
              Pengaturan Sistem
            </h1>
            <p className="text-slate-500 font-medium">
              Konfigurasi parameter global aplikasi mobile ALERTA dan control panel CMS.
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={cn(
            "fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 animate-in slide-in-from-bottom-5",
            toast.type === 'success'
              ? "bg-emerald-500 text-white shadow-emerald-100"
              : "bg-red-500 text-white shadow-red-100"
          )}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <span className="text-sm font-bold tracking-wide">{toast.message}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <Loader2 className="w-10 h-10 text-[#C8102E] animate-spin mb-4" />
            <span className="text-slate-500 font-bold">Memuat konfigurasi sistem...</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Sidebar Navigation Tabs */}
            <div className="lg:col-span-4 space-y-3">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={cn(
                      "w-full text-left p-6 rounded-[24px] border transition-all flex items-start gap-4",
                      isActive
                        ? "bg-slate-800 border-slate-800 text-white shadow-lg shadow-slate-100"
                        : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50/50 hover:text-slate-700"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      isActive ? "bg-white/15 text-white" : "bg-slate-50 text-slate-500"
                    )}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-black tracking-wide uppercase">{tab.label}</h4>
                      <p className={cn(
                        "text-[11px] font-medium mt-1 leading-relaxed",
                        isActive ? "text-slate-300" : "text-slate-400"
                      )}>
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}

              {/* Dynamic Warning Alert Box */}
              {maintenanceMode && (
                <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-6 text-amber-800 flex gap-4 animate-pulse mt-6">
                  <AlertTriangle className="text-amber-600 flex-shrink-0" size={24} />
                  <div>
                    <h5 className="text-[12px] font-black uppercase tracking-wider">Aplikasi Dalam Pemeliharaan</h5>
                    <p className="text-[11px] font-semibold mt-1 leading-relaxed text-amber-700">
                      Mode Pemeliharaan aktif. Seluruh pengguna mobile tidak dapat mengakses konten dan akan dialihkan ke layar maintenance.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Main Form Content Card */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[32px] p-8 lg:p-10 shadow-sm relative overflow-hidden">

              {/* TAB 1: IDENTITAS APLIKASI */}
              {activeTab === 'general' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 italic uppercase">Identitas Aplikasi</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Atur profil instansi resmi Anda agar dikenali publik.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Nama Aplikasi</label>
                      <input
                        type="text"
                        required
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        placeholder="Contoh: ALERTA"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Nama Instansi / Penyelenggara</label>
                      <input
                        type="text"
                        required
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="Contoh: Badan Penanggulangan Bencana Daerah (BPBD)"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Emergency Hotline / Panggilan Darurat</label>
                        <input
                          type="text"
                          required
                          value={hotline}
                          onChange={(e) => setHotline(e.target.value)}
                          placeholder="Contoh: 112"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Email Dukungan Teknis</label>
                        <input
                          type="email"
                          required
                          value={emailSupport}
                          onChange={(e) => setEmailSupport(e.target.value)}
                          placeholder="Contoh: support@alerta.go.id"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SIAGA & NOTIFIKASI */}
              {activeTab === 'alerts' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 italic uppercase">Konfigurasi Siaga & Notifikasi</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Atur sensitivitas deteksi bencana dan model siaran publik.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Alert Radius Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Radius Maksimum Deteksi Siaga</label>
                        <span className="bg-red-50 text-[#C8102E] text-xs font-black px-3 py-1 rounded-lg">
                          {maxAlertRadius} KM
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={maxAlertRadius}
                        onChange={(e) => setMaxAlertRadius(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#C8102E]"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>5 KM</span>
                        <span>15 KM</span>
                        <span>30 KM</span>
                        <span>50 KM</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                        Menentukan jangkauan radius deteksi dari lokasi pengguna untuk mengirimkan notifikasi bencana terdekat.
                      </p>
                    </div>

                    {/* Level Filter Options */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase block">Batas Level Bahaya untuk Notifikasi Instan</label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <button
                          type="button"
                          onClick={() => setAlertNotification('ALL')}
                          className={cn(
                            "p-4 rounded-2xl border text-left transition-all",
                            alertNotification === 'ALL'
                              ? "border-[#C8102E] bg-red-50/10 text-slate-800 ring-2 ring-[#C8102E]/10"
                              : "border-slate-100 bg-slate-50/40 text-slate-500 hover:bg-slate-50/80"
                          )}
                        >
                          <span className="block text-xs font-black uppercase tracking-wider">Semua Level Siaga</span>
                          <span className="block text-[10px] font-semibold mt-1 text-slate-400">Kirim alarm untuk level Waspada, Siaga, dan Awas.</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAlertNotification('HIGH_ONLY')}
                          className={cn(
                            "p-4 rounded-2xl border text-left transition-all",
                            alertNotification === 'HIGH_ONLY'
                              ? "border-[#C8102E] bg-red-50/10 text-slate-800 ring-2 ring-[#C8102E]/10"
                              : "border-slate-100 bg-slate-50/40 text-slate-500 hover:bg-slate-50/80"
                          )}
                        >
                          <span className="block text-xs font-black uppercase tracking-wider">Hanya Bahaya Tinggi</span>
                          <span className="block text-[10px] font-semibold mt-1 text-slate-400">Kirim alarm eksklusif hanya untuk level bahaya kritis (Awas).</span>
                        </button>
                      </div>
                    </div>

                    {/* Sound Configuration */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase flex items-center gap-2">
                        <Volume2 size={14} className="text-slate-400" />
                        Nada Alarm Notifikasi Aplikasi Mobile
                      </label>
                      <select
                        value={notificationSound}
                        onChange={(e) => setNotificationSound(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                      >
                        <option value="emergency_siren">🚨 Emergency Siren (Rekomendasi - Keras)</option>
                        <option value="siren_alert">📢 Loud Warning Horn</option>
                        <option value="beep_alert">🔕 Short Beep Alert</option>
                        <option value="system_default">🎵 Nada Bawaan Handphone</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SISTEM & KEAMANAN */}
              {activeTab === 'security' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 italic uppercase">Sistem & Keamanan</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Kelola visibilitas aplikasi, kontrol registrasi, dan autentikasi.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Toggle: Maintenance Mode */}
                    <div className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[24px] hover:bg-slate-50 transition-colors">
                      <div className="max-w-[75%]">
                        <span className="block text-xs font-black uppercase tracking-wider text-slate-800">Mode Pemeliharaan (Maintenance Mode)</span>
                        <span className="block text-[10px] font-semibold text-slate-400 mt-1 leading-relaxed">
                          Menonaktifkan akses aplikasi mobile untuk masyarakat sementara waktu selama pembaruan sistem berlangsung.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={cn(
                          "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          maintenanceMode ? "bg-[#C8102E]" : "bg-slate-200"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            maintenanceMode ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Toggle: Allow Registration */}
                    <div className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[24px] hover:bg-slate-50 transition-colors">
                      <div className="max-w-[75%]">
                        <span className="block text-xs font-black uppercase tracking-wider text-slate-800">Izinkan Registrasi Pengguna Baru</span>
                        <span className="block text-[10px] font-semibold text-slate-400 mt-1 leading-relaxed">
                          Memungkinkan masyarakat umum membuat akun baru secara mandiri langsung dari aplikasi mobile.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAllowRegistration(!allowRegistration)}
                        className={cn(
                          "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          allowRegistration ? "bg-emerald-500" : "bg-slate-200"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            allowRegistration ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>

                    {/* Toggle: Google OAuth */}
                    <div className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[24px] hover:bg-slate-50 transition-colors">
                      <div className="max-w-[75%]">
                        <span className="block text-xs font-black uppercase tracking-wider text-slate-800">Aktifkan Google OAuth Login</span>
                        <span className="block text-[10px] font-semibold text-slate-400 mt-1 leading-relaxed">
                          Menyediakan tombol masuk otomatis instan sekali klik menggunakan akun Google di aplikasi mobile.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGoogleAuthEnabled(!googleAuthEnabled)}
                        className={cn(
                          "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                          googleAuthEnabled ? "bg-emerald-500" : "bg-slate-200"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            googleAuthEnabled ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Bottom Save Action */}
              <div className="flex items-center justify-end gap-4 pt-8 mt-10 border-t border-slate-100">
                <button
                  type="button"
                  onClick={fetchSettings}
                  disabled={saving}
                  className="px-6 py-4 border border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  Reset Perubahan
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-4 bg-[#C8102E] text-white rounded-2xl font-bold text-sm hover:bg-[#b00e28] shadow-lg shadow-red-200 flex items-center gap-3 transition-all active:scale-[0.98] disabled:bg-[#C8102E]/60 disabled:shadow-none"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Simpan Konfigurasi
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
