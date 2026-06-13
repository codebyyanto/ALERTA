'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Filter, 
  Download, 
  Waves, 
  Flame, 
  ShieldAlert, 
  Wind,
  Check,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/DashboardLayout';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 text-slate-800 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
        <h1>Manajemen Laporan</h1>
      </div>
    </DashboardLayout>
  );
}
