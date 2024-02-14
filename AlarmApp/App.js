import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './src/pages/SettingsScreen';
import { AlarmScreen } from './src/pages/alarm/AlarmScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContextProvider, ThemeContext } from './src/context/ThemeContext';
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
          tabBarLabel: ({ focused, color }) => {
            
            return (
              <Text style={{ fontSize: 16,
               fontFamily: 'Signika-Regular', 
               color: color }}>
                {route.name === 'AlarmScreen' ? 'Home' : 'Settings'}
              </Text>
            );
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
