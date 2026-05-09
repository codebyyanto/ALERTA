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