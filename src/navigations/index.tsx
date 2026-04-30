// utils/index.js (or wherever your main NavigationContainer resides)
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux'; // Add this

import AuthNav from './AuthNav';
import MainNav from './MainNav'; // Import your MainNavigation

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // 1. Grab the token from your Redux state
  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      {/* 2. Logic to switch stacks. Use !token to force the HomeScreen for testing */}
      {token ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};