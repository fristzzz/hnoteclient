/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NoteList from './app/screens/NoteList';
import UserScreen from './app/screens/UserScreen';
import EditingScreen from './app/screens/EditingScreen';
import LoginScreen from './app/screens/Login';
import Icon from './app/components/icon';

import Top from './app/components/top';

import storage from './app/utils/storage';
import register from './app/screens/register';


const App: () => Node = () => {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Editing" component={EditingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="register" component={register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      headerMode='none'




      screenOptions={
        ({ route }) => (
          {
            headerShown: false,

            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (route.name === "便签") {
                iconName = 'note'
              } else if (route.name === "用户") {
                iconName = 'user'
              }
              return <Icon name={iconName} size={20} />
            }
          }
        )
      }
    >
      <Tab.Screen name="便签" component={NoteList} />
      <Tab.Screen name="用户" component={UserScreen} />

    </Tab.Navigator >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})

export default App;
