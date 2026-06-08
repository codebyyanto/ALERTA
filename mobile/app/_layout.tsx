import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { authService } from '@/services/authService';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Cek keberadaan token
        const token = await authService.getStoredToken();
        if (token) {
          setHasToken(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady && hasToken) {
      // Tunggu jeda singkat agar navigasi Stack terpasang sempurna
      const timer = setTimeout(() => {
        router.replace('/(tabs)/edukasi');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady, hasToken]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
