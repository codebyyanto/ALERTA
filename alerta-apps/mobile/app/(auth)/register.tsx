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
            {/* ── Encryption Info Card ── */}
            <View style={styles.infoCard}>
              <View style={styles.infoCardLeft}>
                <View style={styles.infoIconCircle}>
                  <ShieldCheck color="#C8102E" size={20} />
                </View>
                <View style={styles.infoTextWrap}>
                  <Text style={styles.infoTitle}>Data Terenkripsi</Text>
                  <Text style={styles.infoDesc}>
                    Keamanan privasi Anda adalah prioritas kami. Semua data dilindungi dengan enkripsi end-to-end.
                  </Text>
                </View>
              </View>
              <View style={styles.infoShieldWrap}>
                <Shield color="#bfdbfe" size={48} strokeWidth={1} />
              </View>
            </View>
            {/* ── Form Fields ── */}
            <View style={styles.formSection}>

              {/* Nama Lengkap */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>NAMA LENGKAP</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Contoh: Budi Santoso"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="words"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <User color="#94a3b8" size={20} />
                </View>
              </View>
              {/* Email */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>EMAIL</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="nama@email.com"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Mail color="#94a3b8" size={20} />
                </View>
              </View>
              {/* Nomor Telepon */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>NOMOR TELEPON</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="+62 812 3456 7890"
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                  <Phone color="#94a3b8" size={20} />
                </View>
              </View>
              {/* Kata Sandi */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>KATA SANDI</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                    activeOpacity={0.6}
                  >
                    {showPassword ? (
                      <EyeOff color="#94a3b8" size={20} />
                    ) : (
                      <Eye color="#94a3b8" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* ── Register Button ── */}
            <TouchableOpacity
              style={styles.registerBtn}
              activeOpacity={0.8}
              onPress={handleRegister}
            >
              <Text style={styles.registerBtnText}>Daftar Sekarang</Text>
              <ArrowRight color="#ffffff" size={18} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            {/* ── Login Link ── */}
            <View style={styles.loginRow}>
              <Text style={styles.loginLabel}>Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.6}>
                <Text style={styles.loginLink}>Masuk</Text>
              </TouchableOpacity>
            </View>
            {/* ── Trust Badges ── */}
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Lock color="#94a3b8" size={18} />
                <Text style={styles.badgeText}>SSL SECURE</Text>
              </View>
              <View style={styles.badge}>
                <RefreshCw color="#94a3b8" size={18} />
                <Text style={styles.badgeText}>PRIVACY FIRST</Text>
              </View>
              <View style={styles.badge}>
                <ShieldOff color="#94a3b8" size={18} />
                <Text style={styles.badgeText}>ANTI SPAM</Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },

  /* ── Header Bar ── */
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#F8FAFC',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerLogo: {
    fontSize: 15,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: -0.3,
  },
  /* ── Container ── */
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 24,
  },

  /* ── Title ── */
  titleSection: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },

  /* ── Info Card ── */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  infoCardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 16,
  },
  infoShieldWrap: {
    marginLeft: 8,
    opacity: 0.5,
  },