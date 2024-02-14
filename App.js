import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AlarmScreen } from './src/screens/AlarmScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // İkonların yüklenmesi için 'Ionicons' paketini düzelttim.

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='AlarmScreen'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'AlarmScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SettingsScreen') { // Burada 'SettingsScreen' olarak kontrol edilmeli
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'green',
        })}
      >
        <Tab.Screen name="AlarmScreen" component={AlarmScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="SettingsScreen" component={SettingsScreen}  options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
