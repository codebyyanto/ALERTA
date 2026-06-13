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
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </DashboardLayout>
  );
}
