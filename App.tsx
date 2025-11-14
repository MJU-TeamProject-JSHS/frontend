import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AiHomeScreen from './src/screen/ai/AiHomeScreen';
import ProblemMakeScreen from './src/screen/ai/ProblemMakeScreen';
import BoardDetailScreen from './src/screen/board/BoardDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AiHome" component={AiHomeScreen} />
          <Stack.Screen name="ProblemMake" component={ProblemMakeScreen} />
          <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
