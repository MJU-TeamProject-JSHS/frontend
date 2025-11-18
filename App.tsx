import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AiHomeScreen from './src/screen/ai/AiHomeScreen';
import ProblemMakeScreen from './src/screen/ai/ProblemMakeScreen';
import ProblemLoading from './src/screen/ai/ProblemLoadingScreen';
import ProblemResultScreen from './src/screen/ai/ProblemResultScreen';
import BoardListScreen from './src/screen/board/BoardListScreen';
import BoardDetailScreen from './src/screen/board/BoardDetailScreen';
import MyPageScreen from './src/screen/mypage/MyPageMainScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AiHome" component={AiHomeScreen} />
          <Stack.Screen name="BoardList" component={BoardListScreen} />
          <Stack.Screen name="MyPageMain" component={MyPageScreen} />
          <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
          <Stack.Screen name="ProblemMake" component={ProblemMakeScreen} />
          <Stack.Screen name="ProblemLoading" component={ProblemLoading} />
          <Stack.Screen name="ProblemResult" component={ProblemResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>  
    </SafeAreaProvider>
  );
}
