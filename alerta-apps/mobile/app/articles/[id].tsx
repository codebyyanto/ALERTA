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