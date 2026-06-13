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
  const [selectedDisaster, setSelectedDisaster] = useState<any | null>(null);
  const [disasters, setDisasters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const insets = useSafeAreaInsets();
  const paddingTop = Platform.OS === 'android' ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 8 : 36) : (insets.top > 0 ? insets.top : 20);

  const getMarkerOffset = (location: string) => {
    const loc = location.toLowerCase();
    if (loc.includes('selatan')) return { top: '55%', left: '46%' };
    if (loc.includes('barat')) return { top: '35%', left: '28%' };
    if (loc.includes('tengah')) return { top: '45%', left: '55%' };
    if (loc.includes('utara')) return { top: '25%', left: '42%' };
    if (loc.includes('pesisir')) return { top: '70%', left: '15%' };
    return { top: '50%', left: '50%' };
  };

  const getMarkerColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('banjir')) return '#C8102E';
    if (cat.includes('kebakaran')) return '#f59e0b';
    if (cat.includes('gempa')) return '#2563eb';
    return '#64748b';
  };

  const getMarkerIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('banjir')) return <Waves size={12} color="#ffffff" />;
    if (cat.includes('kebakaran')) return <Flame size={12} color="#ffffff" />;
    if (cat.includes('gempa')) return <ShieldAlert size={12} color="#ffffff" />;
    return <AlertTriangle size={12} color="#ffffff" strokeWidth={2.5} />;
  };

  useEffect(() => {
    async function loadDisasters() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/reports?status=TERVERIFIKASI');
        if (res.ok) {
          const json = await res.json();
          setDisasters(json.data || []);
        }
      } catch (err) {
        console.warn('Gagal memuat titik bencana dari API, menggunakan data simulasi.', err);
        // Fallback data simulasi di database jika koneksi mati
        setDisasters([
          { id: '1', reporterName: 'Andi Darmawan', category: 'Kebakaran', location: 'Lampung Selatan', time: '10:45, Hari ini', description: 'Kebakaran hutan semak belukar seluas 3 hektar.' },
          { id: '2', reporterName: 'Siti Aminah', category: 'Banjir', location: 'Lampung Barat', time: '08:20, Hari ini', description: 'Banjir meluap ke pemukiman setinggi 40cm.' }
        ]);
      }
      } finally {
        setLoading(false);
      }
    }
    loadDisasters();
  }, []);

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
        {/* Floating Detail Information Card */}
        {selectedDisaster && (
          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View style={styles.detailTitleWrapper}>
                <Text style={styles.detailLabel}>{selectedDisaster.category.toUpperCase()}</Text>
                <Text style={styles.detailTitle}>{selectedDisaster.location}</Text>
              </View>
              <TouchableOpacity 
                style={styles.closeCardBtn} 
                activeOpacity={0.7}
                onPress={() => setSelectedDisaster(null)}
              >
                <X size={14} color={COLORS.textLight} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
            <Text style={styles.detailTime}>{selectedDisaster.time}</Text>
            <Text style={styles.detailDesc}>{selectedDisaster.description}</Text>
            <Text style={styles.detailReporter}>Dilaporkan oleh: {selectedDisaster.reporterName}</Text>
          </View>
        )}
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

        {/* Loading Spinner */}
        {loading && (
          <View style={styles.loadingSpinnerContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        
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

        {/* Dynamic disasters markers mapping loop */}
        {!loading && disasters
          .filter(d => activeCategory === 'ALL' || d.category.toLowerCase() === activeCategory.toLowerCase())
          .map(d => {
            const offset = getMarkerOffset(d.location);
            const markerBg = getMarkerColor(d.category);
            const isCritical = d.category.toLowerCase() === 'banjir' || d.category.toLowerCase() === 'kebakaran';

            return (
              <View 
                key={d.id} 
                style={[styles.markerWrapper, { top: offset.top, left: offset.left }]} 
                pointerEvents="box-none"
              >
                <TouchableOpacity 
                  style={styles.markerCircle} 
                  activeOpacity={0.8}
                  onPress={() => setSelectedDisaster(d)}
                >
                  {isCritical && (
                    <View style={[styles.markerRipple, { borderColor: markerBg, backgroundColor: `${markerBg}30` }]} />
                  )}
                  <View style={[styles.markerIconBg, { backgroundColor: markerBg }]}>
                    {getMarkerIcon(d.category)}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

        {/* Floating region stats overlay */}
        {!selectedDisaster && (
          <View style={styles.statsOverlayCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>STATISTIK WILAYAH</Text>
              <Text style={styles.statsBadge}>LAMPUNG</Text>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>TERDAMPAK</Text>
                <Text style={styles.statsVal}>1.240</Text>
                <Text style={[styles.statsSubVal, { color: '#ef4444' }]}>▲ 12% Hari Ini</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>PENGUNGSI</Text>
                <Text style={styles.statsVal}>3.412</Text>
                <Text style={[styles.statsSubVal, { color: '#10b981' }]}>● Stabil</Text>
              </View>
            </View>
            
            {/* Logistics progress indicator */}
            <View style={styles.logisticsWrapper}>
              <View style={styles.logisticsHeader}>
                <Text style={styles.logisticsLabel}>Kebutuhan Logistik</Text>
                <Text style={styles.logisticsPercent}>78% Terpenuhi</Text>
              </View>
              <View style={styles.logisticsBarBg}>
                <View style={[styles.logisticsBarValue, { width: '78%' }]} />
              </View>
            </View>
          </View>
        )}

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
  detailCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 30,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailTitleWrapper: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1e293b',
  },
  closeCardBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTime: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 10,
  },
  detailDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 12,
  },
  detailReporter: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
  },
  statsOverlayCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 25,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  statsBadge: {
    fontSize: 8,
    fontWeight: '900',
    color: '#C8102E',
    backgroundColor: 'rgba(200, 16, 46, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  statsItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  statsLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  statsVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1e293b',
    marginTop: 2,
  },
  statsSubVal: {
    fontSize: 8,
    fontWeight: '800',
    marginTop: 2,
  },
  logisticsWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
  },
  logisticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logisticsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
  },
  logisticsPercent: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1e293b',
  },
  logisticsBarBg: {
    height: 5,
    backgroundColor: '#f1f5f9',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  logisticsBarValue: {
    height: '100%',
    backgroundColor: '#0d9488',
    borderRadius: 2.5,
  },
  loadingSpinnerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 22,
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
