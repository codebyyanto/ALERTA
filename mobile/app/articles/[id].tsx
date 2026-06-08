import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Calendar, Eye, ShieldCheck, Share2, Bookmark } from 'lucide-react-native';
import { articleService, Article } from '@/services/articleService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    async function loadArticle() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await articleService.getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error('[Detail] Gagal memuat artikel:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);
  const handleShare = () => {
    alert('Bagikan materi berhasil disalin!');
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C8102E" />
        <Text style={styles.loadingText}>Memuat materi...</Text>
      </View>
    );
  }
  if (!article) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Materi tidak ditemukan atau telah dihapus.</Text>
        <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
          <Text style={styles.backLinkText}>Kembali ke Edukasi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                {/* ── Gambar Cover Atas ── */ }
  <View style={styles.coverContainer}>
    <Image
      source={{
        uri:
          article.image ||
          'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400',
      }}
      style={styles.coverImage}
    />
    <View style={styles.imageOverlay} />
  </View>

  {/* ── Tombol Header Melayang ── */ }
  <SafeAreaView style={styles.floatingHeader} edges={['top']}>
    <TouchableOpacity style={styles.roundBtn} onPress={() => router.back()} activeOpacity={0.6}>
      <ArrowLeft size={20} color="#1e293b" />
    </TouchableOpacity>
    <View style={styles.rightFloatingBtns}>
      <TouchableOpacity
        style={styles.roundBtn}
        onPress={() => setSaved(!saved)}
        activeOpacity={0.6}
      >
        <Bookmark size={20} color={saved ? '#C8102E' : '#1e293b'} fill={saved ? '#C8102E' : 'none'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundBtn} onPress={handleShare} activeOpacity={0.6}>
        <Share2 size={20} color="#1e293b" />
      </TouchableOpacity>
    </View>
  </SafeAreaView>

  {/* ── Konten Scroll ── */ }
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.scrollContent}
    bounces={false}
  >
    <View style={styles.spacer} />
    {/* ── Overlap Card Konten Utama ── */}
    <View style={styles.contentCard}>
    {/* Kategori Badge */}
    <View style={styles.badgeRow}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{article.category.toUpperCase()}</Text>
      </View>
      <View style={styles.verifiedBadge}>
        <ShieldCheck size={12} color="#059669" />
        <Text style={styles.verifiedText}>Lolos Verifikasi BPBD</Text>
      </View>
    </View>

    {/* Judul Materi */}
    <Text style={styles.title}>{article.title}</Text>
    {/* Metadata */}
    <View style={styles.metaRow}>
      <View style={styles.metaItem}>
        <Calendar size={14} color="#94a3b8" />
        <Text style={styles.metaText}>
          {new Date(article.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>
      <View style={styles.metaItem}>
        <Eye size={14} color="#94a3b8" />
        <Text style={styles.metaText}>1.2k tayangan</Text>
      </View>
    </View>

    <View style={styles.divider} />

    {/* Ringkasan Ringkas */}
    <Text style={styles.summaryTitle}>Ringkasan Panduan</Text>
    <View style={styles.summaryBox}>
      <Text style={styles.summaryText}>{article.summary}</Text>
    </View>
    {/* Konten Lengkap */}
    <Text style={styles.bodyText}>{article.content}</Text>

    {/* Tambahan Info / Disclaimer */}
    <View style={styles.disclaimerBox}>
      <Text style={styles.disclaimerTitle}>💡 Rekomendasi Siaga Bencana</Text>
      <Text style={styles.disclaimerText}>
        Simpan panduan ini ke perangkat Anda agar tetap dapat diakses meskipun koneksi internet terputus saat terjadi kondisi darurat bencana.
      </Text>
    </View>
  </View>
      </ScrollView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  /* ── Cover Atas ── */
  coverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: '#e2e8f0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
  },

  /* ── Header Melayang ── */
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 0 : 12,
    zIndex: 10,
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  rightFloatingBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  /* ── Scroll Content ── */
  scrollContent: {
    flexGrow: 1,
  },
  spacer: {
    height: 260, // Membiarkan cover atas terlihat sebagian
  },

  /* ── Overlap Card ── */
  contentCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#065f46',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    lineHeight: 28,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },

  /* ── Ringkasan ── */
  summaryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: -0.2,
    marginTop: 20,
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#C8102E',
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    fontWeight: '500',
  },
  /* ── Konten Lengkap ── */
  bodyText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 25,
    fontWeight: '400',
    marginBottom: 28,
  },
  /* ── Disclaimer Box ── */
  disclaimerBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#2563eb',
    lineHeight: 18,
    fontWeight: '500',
  },
  /* ── Loading & Error ── */
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
  },
  backLink: {
    backgroundColor: '#C8102E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  backLinkText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});