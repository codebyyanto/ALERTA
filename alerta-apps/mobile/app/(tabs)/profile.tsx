import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  Bell,
  ChevronRight,
  Clock,
  HelpCircle,
  Info,
  LogOut,
  Menu,
} from 'lucide-react-native';
import { authService } from '@/services/authService';
import { router } from 'expo-router';