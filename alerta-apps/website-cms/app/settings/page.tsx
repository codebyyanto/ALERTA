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