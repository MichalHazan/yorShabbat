import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    // Lock the screen orientation to landscape globally
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { display: 'none' }
      }}> 
    </Tabs>
  );
}
