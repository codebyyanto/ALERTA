import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Shield,
  Lock,
  RefreshCw,
  ShieldOff,
  ArrowRight,
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // TODO: Integrasi API register nanti
    router.replace('/(tabs)');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        {/* ── Custom Header Bar ── */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.6}
          >
            <ArrowLeft color="#1e293b" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buat Akun Baru</Text>
          <Text style={styles.headerLogo}>ALERTA</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Background Gradient */}
          <LinearGradient
            colors={['#f0f9ff', '#F8FAFC', '#F8FAFC']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.4 }}
          />
          <View style={styles.container}>

            {/* ── Title Section ── */}
            <View style={styles.titleSection}>
              <Text style={styles.pageTitle}>Buat Akun Baru</Text>
              <Text style={styles.pageSubtitle}>
                Gabung dengan jaringan tanggap bencana tercepat di Indonesia.
              </Text>
            </View>