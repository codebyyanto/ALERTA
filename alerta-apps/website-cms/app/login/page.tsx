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