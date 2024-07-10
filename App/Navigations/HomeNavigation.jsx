import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreens/HomeScreen'
import DoctorDetailsScreen from '../Screens/DoctorDetailScreen/DoctorDetailsScreen'

import BusinessListByCategoryScreen from '../Screens/BusinessListByCategory/BusinessListByCategoryScreen'
import ChatScreens from '../Screens/ChatScreens/ChatScreens';
const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="doctor_list" component={BusinessListByCategoryScreen} />
    <Stack.Screen name="doctor-detail" component={DoctorDetailsScreen} />
    <Stack.Screen name="chats" component={ChatScreens} />
  </Stack.Navigator>
  )
}