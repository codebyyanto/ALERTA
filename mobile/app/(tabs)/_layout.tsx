import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Home, Map, Plus, GraduationCap, User as UserIcon } from 'lucide-react-native';
import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#C8102E',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'BERANDA',
          tabBarIcon: ({ color }) => <Home size={22} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'PETA',
          tabBarIcon: ({ color }) => <Map size={22} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'LAPOR',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.centerButton, focused ? styles.centerButtonActive : styles.centerButtonInactive]}>
              <View style={[styles.centerButtonInner, focused ? styles.centerButtonInnerActive : styles.centerButtonInnerInactive]}>
                <Plus size={16} color="#ffffff" strokeWidth={3} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="edukasi"
        options={{
          title: 'EDUKASI',
          tabBarIcon: ({ color }) => <GraduationCap size={22} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFIL',
          tabBarIcon: ({ color }) => <UserIcon size={22} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 88 : 72,
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    paddingTop: 10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  centerButton: {
    width: 54,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 12 : 8,
  },
  centerButtonActive: {
    backgroundColor: '#FCE8E6',
  },
  centerButtonInactive: {
    backgroundColor: '#f1f5f9',
  },
  centerButtonInner: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonInnerActive: {
    backgroundColor: '#C8102E',
  },
  centerButtonInnerInactive: {
    backgroundColor: '#94a3b8',
  },
});
