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
  const [disasters, setDisasters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<any[]>([]);
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const [resReports, resArticles] = await Promise.all([
          fetch('http://localhost:3000/reports?status=TERVERIFIKASI'),
          fetch('http://localhost:3000/articles')
        ]);
        if (resReports.ok) {
          const json = await resReports.json();
          setDisasters(json.data || []);
        }
        if (resArticles.ok) {
          const json = await resArticles.json();
          const activeArticles = json.filter((art: any) => art.status === 'PUBLISHED');
          setArticles(activeArticles);
        }
      } catch (err) {
        console.warn('Gagal memuat statistik bencana untuk beranda dari API.', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);
  const paddingTop = Platform.OS === 'android' ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 8 : 36) : (insets.top > 0 ? insets.top : 20);

  return (
    <View style={[styles.safeArea, { paddingTop }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Latest News Header */}
        <View style={styles.newsSectionHeader}>
          <Text style={styles.newsSectionTitle}>Berita Terkini</Text>
        </View>

        {/* Latest News List */}
        <View style={styles.newsList}>
          {/* News Item 1 */}
          <TouchableOpacity style={styles.newsCard} activeOpacity={0.8}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542350327-013b6b9e4307?auto=format&fit=crop&q=80&w=400' }} 
              style={styles.newsImg} 
            />
            <View style={styles.newsBody}>
              <View style={[styles.badgeCategory, { backgroundColor: '#e0f2fe' }]}>
                <Text style={[styles.badgeCategoryText, { color: '#0369a1' }]}>PENANGANAN</Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>Tim SAR Evakuasi Korban Longsor di Sukabumi</Text>
              <Text style={styles.newsMeta}>2 Jam yang lalu • Metro News</Text>
            </View>
          </TouchableOpacity>
          
          {/* News Item 2 */}
          <TouchableOpacity style={styles.newsCard} activeOpacity={0.8}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400' }} 
              style={styles.newsImg} 
            />
            <View style={styles.newsBody}>
              <View style={[styles.badgeCategory, { backgroundColor: '#fee2e2' }]}>
                <Text style={[styles.badgeCategoryText, { color: '#C8102E' }]}>UPDATE BMKG</Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>Gempa Magnitudo 5.2 Guncang Lampung Barat</Text>
              <Text style={styles.newsMeta}>4 Jam yang lalu • BMKG</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tips Scroll Wrapper */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsScroll}
        >
          {/* Tip Card 1 */}
          <TouchableOpacity style={styles.tipCard} activeOpacity={0.9}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400' }} 
              style={styles.tipCardImg} 
            />
            <View style={styles.tipCardBody}>
              <Text style={styles.tipCardTitle} numberOfLines={2}>Persiapan Tas Siaga Bencana (TSB)</Text>
              <Text style={styles.tipCardDesc} numberOfLines={2}>Barang penting yang wajib ada di dalam tas siaga.</Text>
            </View>
          </TouchableOpacity>
          
          {/* Tip Card 2 */}
          <TouchableOpacity style={styles.tipCard} activeOpacity={0.9}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1582213782179-a0c52e250e8a?auto=format&fit=crop&q=80&w=400' }} 
              style={styles.tipCardImg} 
            />
            <View style={styles.tipCardBody}>
              <Text style={styles.tipCardTitle} numberOfLines={2}>Rencana Evakuasi Mandiri</Text>
              <Text style={styles.tipCardDesc} numberOfLines={2}>Menentukan titik berkumpul keluarga saat keadaan darurat.</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Tips Mitigasi Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tips Mitigasi</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/(tabs)/edukasi')}>
            <Text style={styles.seeAllText}>LIHAT SEMUA</Text>
          </TouchableOpacity>
        </View>

        {/* Active Disasters Grid Row */}
        <View style={styles.activeRow}>
          {/* Banjir Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={[styles.summaryIconBg, { backgroundColor: '#fee2e2' }]}>
                <Droplets size={16} color="#C8102E" />
              </View>
              <View style={styles.badgeActive}>
                <Text style={styles.badgeText}>{`${disasters.filter(d => d.category.toLowerCase() === 'banjir').length} Aktif`}</Text>
              </View>
            </View>
            <Text style={styles.summaryTitle}>Banjir</Text>
            <Text style={styles.summaryLocs}>
              {disasters.filter(d => d.category.toLowerCase() === 'banjir').map(d => d.location.split(',')[0]).slice(0, 2).join(', ') || 'Semua Aman'}
            </Text>
          </View>
          
          {/* Kebakaran Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={[styles.summaryIconBg, { backgroundColor: '#ffedd5' }]}>
                <Flame size={16} color="#f97316" />
              </View>
              <View style={[styles.badgeActive, { backgroundColor: '#ffedd5' }]}>
                <Text style={[styles.badgeText, { color: '#f97316' }]}>{`${disasters.filter(d => d.category.toLowerCase() === 'kebakaran').length} Aktif`}</Text>
              </View>
            </View>
            <Text style={styles.summaryTitle}>Kebakaran</Text>
            <Text style={styles.summaryLocs}>
              {disasters.filter(d => d.category.toLowerCase() === 'kebakaran').map(d => d.location.split(',')[0]).slice(0, 2).join(', ') || 'Semua Aman'}
            </Text>
          </View>
        </View>

        {/* Regional Preparedness Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusTextWrapper}>
            <Text style={styles.statusLabel}>STATUS WILAYAH</Text>
            <Text style={styles.statusValue}>Waspada Moderat</Text>
          </View>
          <View style={styles.statusIconBg}>
            <Activity size={20} color="#0284c7" strokeWidth={2.5} />
          </View>
        </View>

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
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0f2fe',
    marginBottom: 16,
  },
  statusTextWrapper: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0369a1',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0c4a6e',
  },
  statusIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#C8102E',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  summaryLocs: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1e293b',
  },
  seeAllText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: 0.5,
  },
  tipsScroll: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  tipCard: {
    width: 220,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  tipCardImg: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  tipCardBody: {
    padding: 12,
  },
  tipCardTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 16,
  },
  tipCardDesc: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    lineHeight: 14,
  },
  newsSectionHeader: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  newsSectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1e293b',
  },
  newsList: {
    marginHorizontal: 16,
    gap: 12,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
    padding: 10,
    gap: 12,
  },
  newsImg: {
    width: 90,
    height: 90,
    borderRadius: 14,
    resizeMode: 'cover',
  },
  newsBody: {
    flex: 1,
    justifyContent: 'center',
  },
  badgeCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeCategoryText: {
    fontSize: 8,
    fontWeight: '900',
  },
  newsTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 16,
  },
  newsMeta: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
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
