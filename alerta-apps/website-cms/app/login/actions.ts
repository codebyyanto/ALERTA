'use server';

import { cookies } from 'next/headers';
import api from '@/lib/api';
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi' };
  }
  export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: 'Email dan password wajib diisi' };
    }
    try {
      const response = await api.post('/auth/admin/login', { email, password });
      const { access_token, user } = response.data;