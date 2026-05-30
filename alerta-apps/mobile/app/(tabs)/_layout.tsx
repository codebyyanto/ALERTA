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
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <Plus size={22} color="#ffffff" strokeWidth={3} />
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
          href: null, // Sembunyikan tab Explore bawaan
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
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#C8102E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 12 : 8,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});
