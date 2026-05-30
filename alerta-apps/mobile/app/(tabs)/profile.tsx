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

  return (
    <View style={[styles.safeArea, { paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 8 : 36) : (insets.top > 0 ? insets.top : 20) }]}>
      {/* ── Custom Header Bar (Identik dengan Edukasi) ── */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.6}>
          <Menu size={24} color="#1e293b" />
        </TouchableOpacity>

        <Text style={styles.brandTitle}>ALERTA</Text>

        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.6}>
          <Bell size={22} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Kartu Profil Utama ── */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarIconContainer}>
              <User size={48} color="#C8102E" />
            </View>
            {/* Lencana Merah Verifikasi di sudut kanan bawah */}
            <View style={styles.verifiedBadge} />
          </View>

          <Text style={styles.userNameText}>{userName}</Text>
          <Text style={styles.userRoleText}>{userRole}</Text>
        </View>
        {/* ── Menu List Card ── */}
        <View style={styles.menuCard}>
          {/* Item 1: Informasi Pribadi */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuPress('Informasi Pribadi')}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f1f5f9' }]}>
                <User size={20} color="#64748b" />
              </View>
              <Text style={styles.menuItemLabel}>Informasi Pribadi</Text>
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Item 2: Riwayat Laporan (Dengan Red Dot) */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuPress('Riwayat Laporan')}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f1f5f9' }]}>
                <Clock size={20} color="#64748b" />
              </View>
              <View style={styles.labelWithBadge}>
                <Text style={styles.menuItemLabel}>Riwayat Laporan</Text>
                <View style={styles.redDot} />
              </View>
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Item 3: Pengaturan Notifikasi */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuPress('Pengaturan Notifikasi')}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f1f5f9' }]}>
                <Bell size={20} color="#64748b" />
              </View>
              <Text style={styles.menuItemLabel}>Pengaturan Notifikasi</Text>
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Item 4: Pusat Bantuan */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuPress('Pusat Bantuan')}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f1f5f9' }]}>
                <HelpCircle size={20} color="#64748b" />
              </View>
              <Text style={styles.menuItemLabel}>Pusat Bantuan</Text>
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Item 5: Tentang */}
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            activeOpacity={0.7}
            onPress={() => handleMenuPress('Tentang')}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: '#f1f5f9' }]}>
                <Info size={20} color="#64748b" />
              </View>
              <Text style={styles.menuItemLabel}>Tentang</Text>
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
          </TouchableOpacity>
        </View>