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

