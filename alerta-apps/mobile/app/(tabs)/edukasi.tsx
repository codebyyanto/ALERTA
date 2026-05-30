import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Platform,
  Alert,
  StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Search, Eye, Calendar, RefreshCw, X, Menu, Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import { articleService, Article } from '@/services/articleService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Data statis untuk banner kategori
const CATEGORY_BANNERS = [
  {
    id: 'MITIGASI BANJIR',
    label: 'Banjir & Cuaca Ekstrim',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=400',
    badge: 'KRITIS',
  },
  {
    id: 'PANDUAN GEMPA',
    label: 'Gempa Bumi',
    image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=400',
    badge: null,
  },
  {
    id: 'TSUNAMI & ERUPSI',
    label: 'Tsunami',
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&q=80&w=400',
    badge: null,
  },
];

export default function EdukasiScreen() {
  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Ambil data artikel dari API
  const fetchArticles = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const data = await articleService.getArticles('PUBLISHED');
      setArticles(data);
    } catch (error: any) {
      console.error('[Edukasi] Gagal mengambil artikel:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles(true);
  };

  // Filter artikel berdasarkan pencarian dan kategori terpilih
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || art.category.toUpperCase() === selectedCategory.toUpperCase();
    return matchesSearch && matchesCategory;
  });

  const handleStartQuiz = () => {
    Alert.alert(
      'Kuis Harian',
      'Uji kesiagaan bencana Anda dan dapatkan +250 XP untuk pengguna terverifikasi!',
      [
        { text: 'Nanti Saja', style: 'cancel' },
        { text: 'Mulai Kuis', onPress: () => alert('Fitur Kuis akan segera hadir!') },
      ]
    );
  };

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Matikan filter jika diklik ulang
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <View style={[styles.safeArea, { paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 8 : 36) : (insets.top > 0 ? insets.top : 20) }]}>
      {/* ── Custom Header Bar ── */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.6}>
          <Menu size={24} color="#1e293b" />
        </TouchableOpacity>
        
        <Text style={styles.brandTitle}>ALERTA</Text>
        
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.6}>
          <View style={styles.bellBadge} />
          <Bell size={22} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#C8102E" />
        }
      >
        {/* ── Sub Header Konten ── */}
        <View style={styles.titleSection}>
          <Text style={styles.contentLabel}>PUSAT EDUKASI</Text>
          <Text style={styles.contentTitle}>Pelajari & Bersiap.</Text>
        </View>

        {/* ── Search Bar ── */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputRow}>
            <Search color="#94a3b8" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari panduan mitigasi..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X color="#94a3b8" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── Panduan Mitigasi (Kategori Grid) ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Panduan Mitigasi</Text>
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.resetFilterBtn}>HAPUS FILTER</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORY_BANNERS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                onPress={() => handleCategoryPress(cat.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                <View style={styles.categoryOverlay} />
                {cat.badge && (
                  <View style={styles.criticalBadge}>
                    <Text style={styles.criticalText}>{cat.badge}</Text>
                  </View>
                )}
                <Text style={styles.categoryTitle}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Daftar Artikel Carousel ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Materi Mitigasi & Edukasi</Text>
          <TouchableOpacity onPress={() => fetchArticles(false)}>
            <RefreshCw size={14} color="#C8102E" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C8102E" />
            <Text style={styles.loadingText}>Memuat materi dari CMS...</Text>
          </View>
        ) : filteredArticles.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada materi edukasi ditemukan.</Text>
            <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
              <Text style={styles.refreshBtnText}>Muat Ulang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.articlesCarousel}
            snapToInterval={290 + 16}
            decelerationRate="fast"
          >
            {filteredArticles.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                activeOpacity={0.9}
                onPress={() => router.push(`/articles/${article.id}`)}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{
                      uri:
                        article.image ||
                        'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400',
                    }}
                    style={styles.cardImage}
                  />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardMetaRow}>
                    <Text style={styles.cardCategory}>{article.category.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {article.title}
                  </Text>
                  <Text style={styles.cardSummary} numberOfLines={2}>
                    {article.summary}
                  </Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.footerItem}>
                      <Eye size={14} color="#94a3b8" />
                      <Text style={styles.footerItemText}>1.2k dibaca</Text>
                    </View>
                    <View style={styles.footerItem}>
                      <Calendar size={14} color="#94a3b8" />
                      <Text style={styles.footerItemText}>
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* ── Uji Kesiagaan Anda (Banner Kuis Harian) ── */}
        <View style={styles.quizBanner}>
          <View style={styles.quizHeader}>
            <View style={styles.quizBadge}>
              <Text style={styles.quizBadgeText}>🏆 KUIS HARIAN</Text>
            </View>
          </View>
          <Text style={styles.quizTitle}>Uji Kesiagaan Anda</Text>
          <Text style={styles.quizDesc}>
            Apakah Anda tahu apa yang harus dilakukan saat sirine tsunami berbunyi? Ambil kuis 5
            menit ini sekarang.
          </Text>
          <TouchableOpacity style={styles.quizBtn} activeOpacity={0.8} onPress={handleStartQuiz}>
            <Text style={styles.quizBtnText}>Mulai Kuis Sekarang →</Text>
          </TouchableOpacity>
          <Text style={styles.quizXpText}>+250 XP UNTUK PENGGUNA TERVERIFIKASI</Text>
        </View>

        {/* Spacer di bawah agar tidak tertutup tabbar absolut */}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  /* ── Header ── */
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
  bellBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8102E',
    borderWidth: 1.5,
    borderColor: '#ffffff',
    zIndex: 2,
  },
  titleSection: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  contentLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C8102E',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  contentTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1e293b',
    letterSpacing: -0.5,
  },
  /* ── Search ── */
  searchSection: {
    marginVertical: 18,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 242, 254, 0.4)',
    borderWidth: 1,
    borderColor: '#e0f2fe',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
  },
  /* ── Section Header ── */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: -0.3,
  },
  resetFilterBtn: {
    fontSize: 10,
    fontWeight: '800',
    color: '#C8102E',
    letterSpacing: 0.5,
  },
  /* ── Kategori Grid ── */
  categoryScroll: {
    gap: 12,
    paddingBottom: 20,
  },
  categoryCard: {
    width: 200,
    height: 124,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: '#C8102E',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  criticalBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#C8102E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  criticalText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  categoryTitle: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 18,
  },
  /* ── Loading & Empty ── */
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  refreshBtn: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  refreshBtnText: {
    color: '#C8102E',
    fontWeight: '700',
    fontSize: 13,
  },
  /* ── Daftar Artikel ── */
  articlesCarousel: {
    gap: 16,
    paddingBottom: 20,
    paddingLeft: 4,
  },
  articleCard: {
    width: 290,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 10,
  },
  cardImageContainer: {
    height: 180,
    position: 'relative',
    backgroundColor: '#f1f5f9',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 20,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: 22,
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerItemText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
  },
  /* ── Uji Kesiagaan Banner ── */
  quizBanner: {
    backgroundColor: '#1e293b',
    borderRadius: 32,
    padding: 28,
    marginVertical: 12,
    position: 'relative',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  quizHeader: {
    marginBottom: 12,
  },
  quizBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  quizBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#fee2e2',
    letterSpacing: 0.5,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  quizDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  quizBtn: {
    backgroundColor: '#C8102E',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  quizBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  quizXpText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: Platform.OS === 'ios' ? 120 : 96,
  },
});