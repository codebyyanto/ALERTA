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
    <View style={styles.container}></View>
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
    <View style={styles.contentCard}></View>
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