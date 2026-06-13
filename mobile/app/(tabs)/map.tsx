import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Menu,
  Bell,
  Waves,
  Flame,
  ShieldAlert,
  AlertTriangle,
  Compass,
  X,
  Activity,
  Plus,
  Minus,
} from 'lucide-react-native';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const paddingTop = Platform.OS === 'android' ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 8 : 36) : (insets.top > 0 ? insets.top : 20);

  return (
    <View style={[styles.safeArea, { paddingTop }]}>
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

      {/* Map Container Wrapper */}
      <View style={styles.mapWrapper}>
        {/* Backdrop Map will go here */}
      </View>
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
    zIndex: 10,
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0d9488',
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
});
