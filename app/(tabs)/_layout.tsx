import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import "../../global.css"

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {display: "none"},
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false
        }}
      />
    </Tabs>
  );
}
