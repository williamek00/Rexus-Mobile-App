import React from 'react';
import { StyleSheet, Text, View , Button , TouchableOpacity , Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home'
import DetailsScreen from '../screens/Detail'
import NotifScreen from '../screens/Notification'
import SettingScreen from '../screens/Setting'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          activeTintColor: '#007aff',
          inactiveTintColor: '#8e8e93',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotifScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="bell" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

export default function MainStackNavigator() {
    return (
    <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="Product Detail" component={DetailsScreen} />
    </Stack.Navigator>
    )
}