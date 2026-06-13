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
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Disaster Monitoring</h1>
      </div>
    </DashboardLayout>
  );
}
