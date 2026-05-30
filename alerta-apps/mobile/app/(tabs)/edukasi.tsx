import React, { useState, useEffect } from 'react';

export default function EdukasiScreen() {
  return null;
}
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
} from 'react-native';

export default function EdukasiScreen() {
  return null;
}

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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Search, Eye, Calendar, Play, RefreshCw, X, Award } from 'lucide-react-native';
import { router } from 'expo-router';
import { articleService, Article } from '@/services/articleService';

export default function EdukasiScreen() {
  return null;
}
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
const [articles, setArticles] = useState<Article[]>([]);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);

const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    setSelectedCategory(null);
  } else {
    setSelectedCategory(categoryId);
  }
};

return (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#C8102E" />
      }
    >
    </ScrollView>
    <View style={styles.headerBar}>
      <View>
        <Text style={styles.headerLabel}>PUSAT EDUKASI</Text>
        <Text style={styles.headerTitle}>Pelajari & Bersiap.</Text>
      </View>

      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.bellIcon} activeOpacity={0.6}>
          <View style={styles.bellBadge} />
          <Award size={24} color="#C8102E" />
        </TouchableOpacity>
      </View>
    </View>

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
      ) : null}
      {filteredArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tidak ada materi edukasi ditemukan.</Text>

          <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
            <Text style={styles.refreshBtnText}>Muat Ulang</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
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
  </SafeAreaView>
);