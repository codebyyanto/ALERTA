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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AtSign, Lock, Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';

import { AlertaLogo } from '@/components/icons/AlertaLogo';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    // TODO: Integrasi API login nanti
    router.replace('/(tabs)');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        ></ScrollView>

        <LinearGradient
          colors={['#fee2e2', '#e0f2fe', '#F8FAFC']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.6 }}
        />
        <View style={styles.container}>
          <View style={styles.logoSection}>
            <View style={styles.logoBox}>
              <AlertaLogo />
            </View>
            <Text style={styles.logoTitle}>ALERTA</Text>
            <Text style={styles.logoSubtitle}>SISTEM RESPONS BENCANA</Text>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.welcomeTitle}>Selamat Datang</Text>
            <Text style={styles.welcomeDesc}>
              Masuk ke akun Anda untuk mendapatkan peringatan waktu-nyata dan informasi evakuasi.
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>ALAMAT EMAIL</Text>
              <View style={styles.inputRow}>
                <AtSign color="#94a3b8" size={20} />
                <TextInput
                  style={styles.textInput}
                  placeholder="nama@email.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>KATA SANDI</Text>
              <View style={styles.inputRow}>
                <Lock color="#94a3b8" size={20} />
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
          <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.6}>
            <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text style={styles.loginBtnText}>Masuk</Text>
          </TouchableOpacity>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ATAU MASUK DENGAN</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleBtn} activeOpacity={0.6}>
            <View style={styles.googleIconWrap}>
              <GoogleIcon />
            </View>
            <Text style={styles.googleBtnText}>Google</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <View style={styles.registerRow}>
            <Text style={styles.registerLabel}>Belum memiliki akun? </Text>
            <TouchableOpacity activeOpacity={0.6}><Text style={styles.registerLink}>Daftar Akun Baru</Text></TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity activeOpacity={0.6}><Text style={styles.footerText}>PRIVASI</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}><Text style={styles.footerText}>KETENTUAN</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}><Text style={styles.footerText}>BANTUAN</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
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
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 24,
  },
  /* ── Logo ── */

  logoSection: {
    alignItems: 'center',
    marginBottom: 36,
  },

  logoBox: {
    width: 72,
    height: 72,
    backgroundColor: '#C8102E',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  logoTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#C8102E',
    letterSpacing: -0.5,
  },

  logoSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 2,
    marginTop: 4,
  },
  /* ── Title ── */

  titleSection: {
    marginBottom: 28,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },

  welcomeDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },

  /* ── Form ── */

  formSection: {
    marginBottom: 4,
  },

  fieldGroup: {
    marginBottom: 16,
  },

  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 242, 254, 0.5)',
    borderWidth: 1,
    borderColor: '#e0f2fe',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
  },

  eyeBtn: {
    padding: 4,
  },

  /* ── Forgot Password ── */

  forgotBtn: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 28,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C8102E',
  },

  /* ── Login Button ── */

  loginBtn: {
    width: '100%',
    backgroundColor: '#C8102E',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  loginBtnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  /* ── Divider ── */

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  /* ── Google Button ── */

  googleBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  googleIconWrap: {
    marginRight: 12,
  },

  googleBtnText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 15,
  },
  /* ── Spacer ── */

  spacer: {
    flex: 1,
    minHeight: 32,
  },

  /* ── Register ── */

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  registerLabel: {
    color: '#64748b',
    fontWeight: '500',
    fontSize: 14,
  },

  registerLink: {
    color: '#C8102E',
    fontWeight: '700',
    fontSize: 14,
  },

  /* ── Footer ── */

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },

  footerText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
  },
});