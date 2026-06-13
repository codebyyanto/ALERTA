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

export default function MonitoringPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Disaster Monitoring</h1>
      </div>
    </DashboardLayout>
  );
}
