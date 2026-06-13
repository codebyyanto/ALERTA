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
        
        {/* Form segments */}
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
