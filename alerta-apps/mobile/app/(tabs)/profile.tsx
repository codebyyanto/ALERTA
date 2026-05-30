import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, LogOut } from 'lucide-react-native';
import { authService } from '@/services/authService';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('Pengguna ALERTA');

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <User size={32} color="#C8102E" />
        </View>
        <Text style={styles.title}>Profil: {userName}</Text>
        <Text style={styles.description}>
          Halaman data profil dan pengaturan akun sedang dalam pengembangan. Tampilan lengkap akan segera hadir.
        </Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={16} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Keluar dari Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8102E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
