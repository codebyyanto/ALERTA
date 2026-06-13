'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  FileText, 
  BookOpen, 
  Users, 
  Settings,
  LogOut,
  Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/login/actions';

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
  const router = useRouter();
  const [adminUser, setAdminUser] = React.useState<{ name: string; role: string } | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('admin_user');
      if (userStr) {
        try {
          const parsed = JSON.parse(userStr);
          setTimeout(() => {
            setAdminUser(parsed);
          }, 0);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'AU';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  };

  async function handleLogout() {
    const result = await logoutAction();
    if (result.success) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_user');
      }
      router.push('/login');
    }
  }

  return (
    <aside className="w-[280px] bg-[#1E293B] h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center text-white shadow-lg shadow-red-950/20 shrink-0">
          <Megaphone size={20} className="-rotate-12" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tighter leading-none">ALERTA</h1>
          <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-1">
            Disaster Response<br />Admin
          </p>
        </div>
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
          <div className="w-12 h-12 rounded-2xl bg-[#C8102E] overflow-hidden flex items-center justify-center border-2 border-white/10 shrink-0 select-none">
            <span className="text-white font-black text-sm">{getInitials(adminUser?.name || 'Admin Utama')}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-black text-white truncate">{adminUser?.name || 'Admin Utama'}</p>
            <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">{adminUser?.role || 'COMMAND CENTER'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
