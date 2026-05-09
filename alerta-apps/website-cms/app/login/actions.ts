'use server';

import { cookies } from 'next/headers';
import api from '@/lib/api';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi' };
  }

  try {
    const response = await api.post('/auth/admin/login', { email, password });
    const { access_token, user } = response.data;

    // Set HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true, user };
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
    return { error: message };
  }
}