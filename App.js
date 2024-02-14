import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AlarmScreen } from './src/screens/AlarmScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // İkonların yüklenmesi için 'Ionicons' paketini düzelttim.
=======
import { SettingsScreen } from './SettingsScreen';
import { AlarmScreen } from './AlarmScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContextProvider, ThemeContext } from './ThemeContext'; // ThemeContextProvider and ThemeContext added
import { useContext } from "react";
>>>>>>> 2cc1ef3400279330e3c67ae6ed40a2a134cf1b68

const Tab = createBottomTabNavigator();

export default function App() {
  return (
<<<<<<< HEAD
=======
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

function AppContent() {
  let { theme } = useContext(ThemeContext);

  return (
>>>>>>> 2cc1ef3400279330e3c67ae6ed40a2a134cf1b68
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='AlarmScreen'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'AlarmScreen') {
              iconName = focused ? 'home' : 'home-outline';
<<<<<<< HEAD
            } else if (route.name === 'SettingsScreen') { // Burada 'SettingsScreen' olarak kontrol edilmeli
=======
            } else if (route.name === 'SettingsScreen') {
>>>>>>> 2cc1ef3400279330e3c67ae6ed40a2a134cf1b68
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
<<<<<<< HEAD
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'green',
        })}
      >
        <Tab.Screen name="AlarmScreen" component={AlarmScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="SettingsScreen" component={SettingsScreen}  options={{ headerShown: false }} />
=======
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarActiveBackgroundColor: theme.ButtonColor,
          tabBarInactiveBackgroundColor: theme.ButtonColor,

          
        })}
      >
        <Tab.Screen name="AlarmScreen" component={AlarmScreen} options={{ headerShown: false }} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
>>>>>>> 2cc1ef3400279330e3c67ae6ed40a2a134cf1b68
      </Tab.Navigator>
    </NavigationContainer>
  );
}
