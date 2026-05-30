import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  Bell,
  ChevronRight,
  Clock,
  HelpCircle,
  Info,
  LogOut,
  Menu,
} from 'lucide-react-native';
import { authService } from '@/services/authService';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState('Budi Setiawan');
  const [userRole, setUserRole] = useState('Pengguna Terverifikasi');

  useEffect(() => {
    async function loadUser() {
      const user = await authService.getStoredUser();
      if (user?.name) {
        setUserName(user.name);
      }
    }
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await authService.logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const handleMenuPress = (menuName: string) => {
    Alert.alert('Fitur Terkunci', `Halaman ${menuName} akan segera hadir dalam pembaruan berikutnya!`);
  };