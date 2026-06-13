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
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
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
            {/* All */}
            <TouchableOpacity 
              style={[styles.pillBtn, activeCategory === 'ALL' && styles.pillBtnActive]} 
              activeOpacity={0.7}
              onPress={() => setActiveCategory('ALL')}
            >
              <Text style={[styles.pillText, activeCategory === 'ALL' && styles.pillTextActive]}>Semua</Text>
            </TouchableOpacity>

            {/* Banjir */}
            <TouchableOpacity 
              style={[styles.pillBtn, activeCategory === 'Banjir' && styles.pillBtnActive]} 
              activeOpacity={0.7}
              onPress={() => setActiveCategory('Banjir')}
            >
              <Waves size={14} color={activeCategory === 'Banjir' ? '#ffffff' : COLORS.textDark} />
              <Text style={[styles.pillText, activeCategory === 'Banjir' && styles.pillTextActive]}>Banjir</Text>
            </TouchableOpacity>

            {/* Kebakaran */}
            <TouchableOpacity 
              style={[styles.pillBtn, activeCategory === 'Kebakaran' && styles.pillBtnActive]} 
              activeOpacity={0.7}
              onPress={() => setActiveCategory('Kebakaran')}
            >
              <Flame size={14} color={activeCategory === 'Kebakaran' ? '#ffffff' : COLORS.textDark} />
              <Text style={[styles.pillText, activeCategory === 'Kebakaran' && styles.pillTextActive]}>Kebakaran</Text>
            </TouchableOpacity>

            {/* Gempa */}
            <TouchableOpacity 
              style={[styles.pillBtn, activeCategory === 'Gempa' && styles.pillBtnActive]} 
              activeOpacity={0.7}
              onPress={() => setActiveCategory('Gempa')}
            >
              <ShieldAlert size={14} color={activeCategory === 'Gempa' ? '#ffffff' : COLORS.textDark} />
              <Text style={[styles.pillText, activeCategory === 'Gempa' && styles.pillTextActive]}>Gempa</Text>
            </TouchableOpacity>

            {/* Longsor */}
            <TouchableOpacity 
              style={[styles.pillBtn, activeCategory === 'Longsor' && styles.pillBtnActive]} 
              activeOpacity={0.7}
              onPress={() => setActiveCategory('Longsor')}
            >
              <AlertTriangle size={14} color={activeCategory === 'Longsor' ? '#ffffff' : COLORS.textDark} strokeWidth={2.5} />
              <Text style={[styles.pillText, activeCategory === 'Longsor' && styles.pillTextActive]}>Longsor</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Flood active marker overlay */}
        <View style={[styles.markerWrapper, { top: '55%', left: '46%' }]} pointerEvents="box-none">
          <TouchableOpacity style={styles.markerCircle} activeOpacity={0.8}>
            <View style={styles.markerRipple} />
            <View style={[styles.markerIconBg, { backgroundColor: '#C8102E' }]}>
              <Waves size={12} color="#ffffff" />
            </View>
          </TouchableOpacity>
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
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  pillBtnActive: {
    backgroundColor: '#C8102E',
    borderColor: '#C8102E',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1e293b',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  markerWrapper: {
    position: 'absolute',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -22,
    marginTop: -22,
    zIndex: 15,
  },
  markerCircle: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIconBg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  markerRipple: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(200, 16, 46, 0.25)',
    borderWidth: 1,
    borderColor: '#C8102E',
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
