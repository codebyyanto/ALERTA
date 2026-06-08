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

        {/* ── Tombol Keluar Akun (Kartu Terpisah) ── */}
        <TouchableOpacity
          style={styles.logoutCard}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#C8102E" />
          <Text style={styles.logoutCardText}>Keluar Akun</Text>
        </TouchableOpacity>

        {/* ── Catatan Kaki Versi ── */}
        <Text style={styles.versionText}>ALERTA V1.0.0 • INDONESIA</Text>
        {/* Spacer di bawah agar tidak tertutup bottom tab */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: 2,
    textAlign: 'center',
  },
  headerIconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  /* ── Kartu Profil Utama ── */
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fee2e2',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C8102E',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 6,
    textAlign: 'center',
  },
  userRoleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  /* ── Menu Card ── */
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },
  labelWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8102E',
  },
  /* ── Tombol Keluar Akun Card ── */
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
    shadowColor: '#fee2e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    marginBottom: 32,
  },
  logoutCardText: {
    color: '#C8102E',
    fontWeight: '800',
    fontSize: 16,
  },
  /* ── Catatan Kaki Versi ── */
  versionText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  bottomSpacer: {
    height: Platform.OS === 'ios' ? 120 : 96,
  },
});