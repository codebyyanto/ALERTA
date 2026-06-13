import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Menu,
  Bell,
  Waves,
  Flame,
  ShieldAlert,
  AlertTriangle,
  Compass,
  X,
  Activity,
  Plus,
  Minus,
} from 'lucide-react-native';

export default function MapScreen() {
  return (
    <View style={styles.safeArea}>
      <Text>Peta Kebencanaan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
