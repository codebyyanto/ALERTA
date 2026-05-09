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