import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import SavedScreen from '../screens/SavedScreen';
import { COLORS, STUDENT_INFO } from '../constants/config';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Alt Sekmeler: Liste ve Kaydedilenler (Bottom Tab Navigator)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.card,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: COLORS.textPrimary,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'pulse-outline';
          if (route.name === 'Liste') {
            iconName = focused ? 'pulse' : 'pulse-outline';
          } else if (route.name === 'Kaydedilenler') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Liste"
        component={ListScreen}
        options={{
          title: `${STUDENT_INFO.topicTitle} (≤ 10 km)`,
          tabBarLabel: 'Depremler',
        }}
      />
      <Tab.Screen
        name="Kaydedilenler"
        component={SavedScreen}
        options={{
          title: 'Kaydedilen Depremler',
          tabBarLabel: 'Kaydedilenler',
        }}
      />
    </Tab.Navigator>
  );
}

// Üst Navigasyon: Detay ekranı Stack Navigator ile sekmelerin üstünde açılır
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.card,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detay"
          component={DetailScreen}
          options={{
            title: 'Deprem Detayı',
            headerBackTitle: 'Geri',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
