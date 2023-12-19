import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './SettingsScreen';
import { AlarmScreen } from './AlarmScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContextProvider, ThemeContext } from './ThemeContext'; // ThemeContextProvider ve ThemeContext ekledim
import { useContext } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

function AppContent() {
  let { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='AlarmScreen'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'AlarmScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SettingsScreen') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarActiveBackgroundColor: theme.ButtonColor,
          tabBarInactiveBackgroundColor: theme.ButtonColor,

          
        })}
      >
        <Tab.Screen name="AlarmScreen" component={AlarmScreen} options={{ headerShown: false }} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
