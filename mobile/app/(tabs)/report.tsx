import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle } from 'lucide-react-native';

export default function ReportScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <AlertTriangle size={32} color="#C8102E" />
        </View>
        <Text style={styles.title}>Lapor Kejadian</Text>
        <Text style={styles.description}>
          Halaman Lapor cepat kejadian darurat bencana sedang dalam pengembangan. Tampilan lengkap akan segera hadir.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
