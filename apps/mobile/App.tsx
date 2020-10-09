import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';
import { ServerTime } from './src/server.time';
import { Provider as PaperProvider } from 'react-native-paper';
import { auth, client } from './src/client';
import { HomeScreen } from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomersScreen } from './src/screens/CustomersScreen';
import { LoginScreen } from './src/screens/LoginScreen';

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();


  return (
    <PaperProvider>
      <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Customers" component={CustomersScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        <StatusBar style="auto" />
      </ApolloProvider>
    </PaperProvider>
  );
}
