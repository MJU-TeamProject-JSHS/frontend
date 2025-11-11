import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AiHomeScreen from './src/screen/ai/AiHomeScreen';
import ProblemMakeScreen from './src/screen/ai/ProblemMakeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AiHome" component={AiHomeScreen} />
            <Stack.Screen name="ProblemMake" component={ProblemMakeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
