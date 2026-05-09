import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
// ── Types ──
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export interface AuthResponse {
  access_token: string;
  message?: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
// ── API Calls ──

export const authService = {
  /**
   * Login user biasa (bukan admin)
   * POST /auth/login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    // Simpan token ke AsyncStorage
    await AsyncStorage.setItem('access_token', data.access_token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },
  /**
   * Register user baru
   * POST /auth/register
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    // Auto-login: simpan token setelah register berhasil
    await AsyncStorage.setItem('access_token', data.access_token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },