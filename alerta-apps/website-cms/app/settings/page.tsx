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

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [appName, setAppName] = useState('');
  const [institution, setInstitution] = useState('');
  const [hotline, setHotline] = useState('');
  const [emailSupport, setEmailSupport] = useState('');
  const [maxAlertRadius, setMaxAlertRadius] = useState(15);
  const [alertNotification, setAlertNotification] = useState('ALL');
  const [notificationSound, setNotificationSound] = useState('emergency_siren');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState(true);

  async function fetchSettings() {
    try {
      setLoading(true);

      const res = await api.get('/settings');
      const data = res.data;
      setMaxAlertRadius(
        data.maxAlertRadius !== undefined
          ? data.maxAlertRadius
          : 15
      );

      setAlertNotification(data.alertNotification || 'ALL');

      setNotificationSound(
        data.notificationSound || 'emergency_siren'
      );
      setMaintenanceMode(data.maintenanceMode || false);

      setAllowRegistration(
        data.allowRegistration !== undefined
          ? data.allowRegistration
          : true
      );

      setGoogleAuthEnabled(
        data.googleAuthEnabled !== undefined
          ? data.googleAuthEnabled
          : true
      );
    } catch (err) {
      console.error('Error fetching settings:', err);

      showToast(
        'Gagal memuat pengaturan sistem',
        'error'
      );
    } finally {
      setLoading(false);
    }

    useEffect(() => {
      fetchSettings();
    }, []);
    function showToast(
      message: string,
      type: 'success' | 'error' = 'success'
    ) {
      setToast({ message, type });

      setTimeout(() => {
        setToast(null);
      }, 4000);
    }
    async function handleSave(e: React.FormEvent) {
      e.preventDefault();

      try {
        setSaving(true);
        const res = await api.patch('/settings', {
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
        showToast(
          'Pengaturan sistem berhasil disimpan secara permanen!'
        );
      } catch (err) {
        console.error('Error saving settings:', err);

        showToast(
          'Gagal menyimpan pengaturan sistem',
          'error'
        );
      } finally {
        setSaving(false);
      }
      const tabs = [
        {
          id: 'general',
          label: 'Identitas Aplikasi',
          icon: Globe,
          desc: 'Nama aplikasi, organisasi, kontak, dan bantuan.'
        },
        {
          id: 'alerts',
          label: 'Siaga & Notifikasi',
          icon: Sliders,
          desc: 'Radius siaga bencana, tingkat bahaya, dan audio alarm.'
        },
        {
          id: 'security',
          label: 'Sistem & Akses',
          icon: ShieldCheck,
          desc: 'Mode pemeliharaan, registrasi user, dan integrasi OAuth.'
        },
      ];

      return (
        <DashboardLayout>
          <div className="p-8 max-w-[1200px] mx-auto min-h-screen relative pb-24">
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

                <span className="text-[14px] font-black text-slate-800">
                  ALERTA CMS
                </span>

              </div>
            </header>
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

            {toast && (
              <div
                className={cn(
                  "fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 animate-in slide-in-from-bottom-5",
                  toast.type === 'success'
                    ? "bg-emerald-500 text-white shadow-emerald-100"
                    : "bg-red-500 text-white shadow-red-100"
                )}
              >

                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>

                <span className="text-sm font-bold tracking-wide">
                  {toast.message}
                </span>

              </div>
            )}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[32px] border border-slate-100 shadow-sm">

                <Loader2 className="w-10 h-10 text-[#C8102E] animate-spin mb-4" />

                <span className="text-slate-500 font-bold">
                  Memuat konfigurasi sistem...
                </span>

              </div>
            ) : (
              <form
                onSubmit={handleSave}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
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
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-slate-50 text-slate-500"
                          )}
                        >
                          <Icon size={20} />
                        </div>

                        <div className="flex-1">

                          <h4 className="text-[14px] font-black tracking-wide uppercase">
                            {tab.label}
                          </h4>

                          <p
                            className={cn(
                              "text-[11px] font-medium mt-1 leading-relaxed",
                              isActive
                                ? "text-slate-300"
                                : "text-slate-400"
                            )}
                          >
                            {tab.desc}
                          </p>

                        </div>
                      </button>
                    );
                  })}

                  {maintenanceMode && (
                    <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-6 text-amber-800 flex gap-4 animate-pulse mt-6">

                      <AlertTriangle
                        className="text-amber-600 flex-shrink-0"
                        size={24}
                      />

                      <div>

                        <h5 className="text-[12px] font-black uppercase tracking-wider">
                          Aplikasi Dalam Pemeliharaan
                        </h5>

                        <p className="text-[11px] font-semibold mt-1 leading-relaxed text-amber-700">
                          Mode Pemeliharaan aktif. Seluruh pengguna mobile tidak dapat mengakses konten dan akan dialihkan ke layar maintenance.
                        </p>

                      </div>

                    </div>
                  )}
                </div>

                <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[32px] p-8 lg:p-10 shadow-sm relative overflow-hidden">

                  {activeTab === 'general' && (
                    <div className="space-y-8 animate-in fade-in duration-300">

                      <div>

                        <h3 className="text-lg font-black text-slate-800 italic uppercase">
                          Identitas Aplikasi
                        </h3>

                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          Atur profil instansi resmi Anda agar dikenali publik.
                        </p>

                      </div>

                    </div>
                  )}
