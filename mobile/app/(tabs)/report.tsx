import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
  Platform,
  Alert,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Menu,
  Bell,
  Flame,
  Waves,
  PlusSquare,
  AlertTriangle,
  Activity,
  MoreHorizontal,
  Camera,
  X,
  MapPin,
  CheckCircle,
} from 'lucide-react-native';

export default function ReportScreen() {
  const [category, setCategory] = useState<string>('Kebakaran');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Lapor Kejadian</Text>
          <Text style={styles.subtitleText}>
            Berikan informasi akurat untuk penanganan cepat petugas di lapangan.
          </Text>
        </View>
        
        {/* Photo Upload Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>UNGGAH BUKTI FOTO</Text>
          <View style={styles.photoRow}>
            {!photoUri ? (
              <TouchableOpacity 
                style={styles.uploadDashedButton} 
                activeOpacity={0.7}
              >
                <Camera size={24} color="#94a3b8" />
                <Text style={styles.uploadText}>Ambil Foto</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.previewContainer}>
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
                <TouchableOpacity style={styles.closeBtn} activeOpacity={0.7}>
                  <X size={12} color="#ffffff" strokeWidth={3} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Category Selector */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>KATEGORI KEJADIAN</Text>
          
          <View style={styles.categoriesGrid}>
            {/* Kebakaran */}
            <TouchableOpacity 
              style={[styles.categoryCard, category === 'Kebakaran' && styles.categoryCardActive]} 
              activeOpacity={0.7}
              onPress={() => setCategory('Kebakaran')}
            >
              <Flame size={24} color={category === 'Kebakaran' ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.categoryText, category === 'Kebakaran' && styles.categoryTextActive]}>Kebakaran</Text>
            </TouchableOpacity>

            {/* Banjir */}
            <TouchableOpacity 
              style={[styles.categoryCard, category === 'Banjir' && styles.categoryCardActive]} 
              activeOpacity={0.7}
              onPress={() => setCategory('Banjir')}
            >
              <Waves size={24} color={category === 'Banjir' ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.categoryText, category === 'Banjir' && styles.categoryTextActive]}>Banjir</Text>
            </TouchableOpacity>

            {/* Medis */}
            <TouchableOpacity 
              style={[styles.categoryCard, category === 'Medis' && styles.categoryCardActive]} 
              activeOpacity={0.7}
              onPress={() => setCategory('Medis')}
            >
              <PlusSquare size={24} color={category === 'Medis' ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.categoryText, category === 'Medis' && styles.categoryTextActive]}>Medis</Text>
            </TouchableOpacity>

            {/* Longsor */}
            <TouchableOpacity 
              style={[styles.categoryCard, category === 'Longsor' && styles.categoryCardActive]} 
              activeOpacity={0.7}
              onPress={() => setCategory('Longsor')}
            >
              <AlertTriangle size={24} color={category === 'Longsor' ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.categoryText, category === 'Longsor' && styles.categoryTextActive]}>Longsor</Text>
            </TouchableOpacity>

            {/* Gempa */}
            <TouchableOpacity 
              style={[styles.categoryCard, category === 'Gempa' && styles.categoryCardActive]} 
              activeOpacity={0.7}
              onPress={() => setCategory('Gempa')}
            >
              <Activity size={24} color={category === 'Gempa' ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.categoryText, category === 'Gempa' && styles.categoryTextActive]}>Gempa</Text>
            </TouchableOpacity>

            {/* Lainnya */}
            <TouchableOpacity 
              style={[styles.categoryCard, category === 'Lainnya' && styles.categoryCardActive]} 
              activeOpacity={0.7}
              onPress={() => setCategory('Lainnya')}
            >
              <MoreHorizontal size={24} color={category === 'Lainnya' ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.categoryText, category === 'Lainnya' && styles.categoryTextActive]}>Lainnya</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Text style={styles.stepNumberActive}>1</Text>
          </View>
          <Text style={styles.stepLabelActive}>DETAIL</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepLabel}>LOKASI</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepLabel}>KIRIM</Text>
        </View>
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
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  stepItem: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepCircleActive: {
    backgroundColor: '#C8102E',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
  },
  stepNumberActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  stepLabelActive: {
    fontSize: 9,
    fontWeight: '800',
    color: '#C8102E',
    letterSpacing: 0.5,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 120 : 96,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1e293b',
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748b',
    letterSpacing: 1,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  categoryCardActive: {
    borderColor: '#C8102E',
    backgroundColor: '#fff5f5',
  },
  categoryTextActive: {
    color: '#C8102E',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  uploadDashedButton: {
    width: 130,
    height: 130,
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
  },
  previewContainer: {
    width: 130,
    height: 130,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCard: {
    width: '31%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
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
