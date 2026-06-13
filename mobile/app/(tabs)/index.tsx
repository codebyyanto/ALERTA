import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Menu,
  Bell,
  Megaphone,
  Waves,
  Flame,
  ShieldAlert,
  AlertTriangle,
  ChevronRight,
  Activity,
  Droplets,
} from 'lucide-react-native';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const paddingTop = Platform.OS === 'android' ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 8 : 36) : (insets.top > 0 ? insets.top : 20);

  return (
    <View style={[styles.safeArea, { paddingTop }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Quick Report Button */}
        <TouchableOpacity 
          style={styles.reportBtn} 
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/report')}
        >
          <Megaphone size={18} color="#ffffff" strokeWidth={2.5} />
          <Text style={styles.reportBtnText}>Lapor Kejadian Sekarang</Text>
        </TouchableOpacity>

        {/* Early Warning Card */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <AlertTriangle size={16} color="#ffffff" strokeWidth={2.5} />
            <Text style={styles.warningTag}>PERINGATAN DINI</Text>
          </View>
          <Text style={styles.warningTitle}>Siaga Banjir Bandar Lampung</Text>
          <Text style={styles.warningDesc}>
            Level Siaga 2: Kenaikan debit air di aliran sungai Way Kuala. Waspada kiriman air dari daerah hulu.
          </Text>
          <View style={styles.warningFooter}>
            <TouchableOpacity style={styles.warningBtn} activeOpacity={0.9}>
              <Text style={styles.warningBtnText}>Lihat Detail</Text>
            </TouchableOpacity>
            <Text style={styles.warningTime}>Diperbarui: 5 Menit Lalu</Text>
          </View>
        </View>

        {/* Custom Header Bar */}
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.6}>
            <Menu size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.brandTitle}>ALERTA</Text>

          <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.6}>
            <Bell size={22} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const COLORS = {
  primary: '#C8102E',
  secondary: '#fee2e2',
  background: '#F8FAFC',
  textDark: '#1e293b',
  textLight: '#64748b',
  border: '#e2e8f0',
};

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
    marginBottom: 16,
  },
  warningCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#C8102E',
    padding: 20,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 16,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  warningTag: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  warningTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  warningDesc: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  warningFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warningBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  warningBtnText: {
    color: '#C8102E',
    fontSize: 12,
    fontWeight: '900',
  },
  warningTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    backgroundColor: '#C8102E',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reportBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
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
  },
  scrollContainer: {
    paddingBottom: 90, // room for floating tab bar
  },
});
