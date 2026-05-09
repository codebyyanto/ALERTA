import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000'; // Android Emulator
    }
    return 'http://localhost:3000'; // iOS Simulator
  }
  return 'https://api.alerta.id'; // Production URL nanti
};
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — menambahkan token ke setiap request
api.interceptors.request.use(
  async (config) => {
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Token tidak tersedia, lanjutkan tanpa token
    }
    return config;
  },
  (error) => Promise.reject(error),
);
// Response interceptor — handle error secara global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server merespons dengan status error
      const { status, data } = error.response;
      const message = data?.message || 'Terjadi kesalahan pada server';

      if (status === 401) {
        // Token expired / unauthorized — bisa redirect ke login
        console.warn('[API] Unauthorized:', message);
      }
      return Promise.reject({
        status,
        message: Array.isArray(message) ? message[0] : message,
      });
    } else if (error.request) {
      // Tidak ada respons dari server
      return Promise.reject({
        status: 0,
        message: 'Tidak dapat terhubung ke server. Pastikan koneksi internet Anda aktif.',
      });
    }
    return Promise.reject({
      status: -1,
      message: error.message || 'Terjadi kesalahan tidak diketahui',
    });
  },
);