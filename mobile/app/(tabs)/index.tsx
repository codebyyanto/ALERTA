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
  return (
    <View style={styles.safeArea}>
      <Text>Beranda Alerta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
