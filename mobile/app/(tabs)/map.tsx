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
        {/* Lampung Map Backdrop */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600' }} 
          style={styles.mapBackdrop} 
        />
        {/* Overlay Gradients */}
        <View style={styles.mapOverlay} />
        
        {/* Map Zoom Controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
            <Plus size={18} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBtn, { borderTopWidth: 1, borderTopColor: '#f1f5f9' }]} activeOpacity={0.7}>
            <Minus size={18} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* GPS Locate Control */}
        <TouchableOpacity style={styles.gpsLocateBtn} activeOpacity={0.7}>
          <Compass size={20} color={COLORS.textDark} strokeWidth={2} />
        </TouchableOpacity>

        {/* Category Filter Pills (Horizontal List) */}
        <View style={styles.filterPillsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsScroll}
          >
            {/* Filter Pills */}
          </ScrollView>
        </View>

        {/* Map Overlays */}
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
  mapBackdrop: {
    width: '100%',
    height: '100%',
    opacity: 0.35,
    resizeMode: 'cover',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 148, 136, 0.15)', // soft green ocean tint
  },
  zoomControls: {
    position: 'absolute',
    top: 80,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    padding: 2,
    zIndex: 20,
  },
  controlBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsLocateBtn: {
    position: 'absolute',
    bottom: 250,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 20,
  },
  filterPillsContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  filterPillsScroll: {
    paddingHorizontal: 16,
    gap: 8,
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
