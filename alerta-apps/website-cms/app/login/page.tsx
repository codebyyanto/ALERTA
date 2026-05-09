'use client';

import React, { useState, useTransition } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Circle } from 'lucide-react';
import { loginAction } from './actions';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await loginAction(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        router.push('/');
      }
    });
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
      {/* Logo Header */}
      <div className="flex flex-col items-center mb-10 z-10">
        <h1 className="text-[28px] font-black text-[#C8102E] tracking-tighter">ALERTA</h1>
        <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
          Disaster Response Management
        </p>
      </div>
      {/* Login Card */}
      <div className="w-full max-w-[480px] bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] z-10 border border-white">
        <div className="mb-10">
          <h2 className="text-[24px] font-bold text-slate-800 mb-2">Masuk ke Panel Kontrol</h2>
          <p className="text-slate-500 text-[14px]">Silakan masukkan kredensial admin Anda.</p>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Alamat Email
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C8102E] transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@alerta.go.id"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500/20 transition-all"
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Kata Sandi
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C8102E] transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-slate-200 rounded-md peer-checked:bg-red-500 peer-checked:border-red-500 transition-all" />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>
              <span className="text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Ingat Saya</span>
            </label>
            <button type="button" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
              Lupa Kata Sandi?
            </button>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full bg-[#C8102E] text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(200,16,46,0.15)] hover:shadow-[0_10px_25px_rgba(200,16,46,0.25)] hover:bg-[#b00e28] active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100",
              isPending && "cursor-not-allowed"
            )}
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Masuk ke Dashboard
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Belum punya akses? <button className="text-red-600 font-bold hover:underline">Hubungi Admin Utama</button>
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full bg-[#C8102E] text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(200,16,46,0.15)] hover:shadow-[0_10px_25px_rgba(200,16,46,0.25)] hover:bg-[#b00e28] active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100",
          isPending && "cursor-not-allowed"
        )}
      >
        {isPending ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Masuk ke Dashboard
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
    <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Belum punya akses? <button className="text-red-600 font-bold hover:underline">Hubungi Admin Utama</button>
          </p>
        </div>
      </div >