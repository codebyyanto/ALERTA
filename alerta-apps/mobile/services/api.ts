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