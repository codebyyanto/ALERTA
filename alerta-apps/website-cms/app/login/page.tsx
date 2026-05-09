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