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