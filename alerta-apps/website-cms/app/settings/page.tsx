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