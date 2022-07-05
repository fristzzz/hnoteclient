/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NoteScreen from './app/screens/NoteScreen';
import UserScreen from './app/screens/UserScreen';
import EditingScreen from './app/screens/EditingScreen';
// TODO
import storage from './app/utils/storage';
import Top from './app/components/top'


const App: () => Node = () => {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="Editing" component={EditingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const homeScreen = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      headerMode='none'
      screenOptions={{
        headerShown: false
      }} >
      <Tab.Screen name="Note" component={NoteScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})

export default App;
