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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );