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

  </SafeAreaView>
);