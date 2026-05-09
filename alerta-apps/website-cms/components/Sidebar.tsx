'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  FileText, 
  BookOpen, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'DASHBOARD', href: '/dashboard' },
  { icon: Activity, label: 'DISASTER MONITORING', href: '/monitoring' },
  { icon: FileText, label: 'REPORT MANAGEMENT', href: '/reports' },
  { icon: BookOpen, label: 'EDUCATION CONTENT', href: '/' },
  { icon: Users, label: 'USER MANAGEMENT', href: '/users' },
  { icon: Settings, label: 'SYSTEM SETTINGS', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#1E293B] h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-8 pb-10">
        <h1 className="text-2xl font-black text-white tracking-tighter">ALERTA</h1>
        <p className="text-[10px] font-bold text-slate-400 tracking-[0.1em] uppercase mt-1">
          Disaster Response Admin
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl transition-all group",
                    isActive 
                      ? "bg-white/10 text-white shadow-lg" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
                  <span className="text-[11px] font-bold tracking-wider">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-[#C8102E] rounded-r-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500 overflow-hidden flex items-center justify-center border-2 border-white/10">
            {/* Placeholder for avatar */}
            <span className="text-white font-bold">BS</span>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-white">Budi Santoso</p>
            <p className="text-[11px] text-slate-400 font-medium">SUPER ADMIN</p>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
