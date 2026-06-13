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

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </DashboardLayout>
  );
}
