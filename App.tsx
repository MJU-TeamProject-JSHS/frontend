import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/screen/auth/SplashScreen';
import LoginScreen from './src/screen/auth/LoginScreen';

import AiHomeScreen from './src/screen/ai/AiHomeScreen';
import ProblemMakeScreen from './src/screen/ai/ProblemMakeScreen';
import ProblemLoading from './src/screen/ai/ProblemLoadingScreen';
import ProblemResultScreen from './src/screen/ai/ProblemResultScreen';

import BoardListScreen from './src/screen/board/BoardListScreen';
import BoardDetailScreen from './src/screen/board/BoardDetailScreen';
import BoardWriteScreen from './src/screen/board/BoardWriteScreen';
import BoardDetail3Screen from './src/screen/board/BoardDetail3Screen';
import ScrapListScreen from './src/screen/scrap/ScrapListScreen';

import MyPageScreen from './src/screen/mypage/MyPageMainScreen';
import PDFViewerScreen from './src/screen/common/PDFViewerScreen';
import MyPostsScreen from './src/screen/mypage/MyPostsScreen';
import MyPostDetail2 from './src/screen/mypage/MyPostDetail+';

import BottomTabBar from './src/components/global/BottomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 메인 탭 네비게이터 (AiHome, BoardList, ScrapList, MyPageMain)
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="AiHome" component={AiHomeScreen} />
      <Tab.Screen name="BoardList" component={BoardListScreen} />
      <Tab.Screen name="ScrapList" component={ScrapListScreen} />
      <Tab.Screen name="MyPageMain" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          
          {/* 메인 탭 네비게이터 */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          
          {/* 나머지 화면들 */}
          <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
          <Stack.Screen name="BoardWrite" component={BoardWriteScreen} />
          <Stack.Screen name="PDFViewer" component={PDFViewerScreen} />
          <Stack.Screen name="ProblemMake" component={ProblemMakeScreen} />
          <Stack.Screen name="ProblemLoading" component={ProblemLoading} />
          <Stack.Screen name="ProblemResult" component={ProblemResultScreen} />
          <Stack.Screen name="MyPosts" component={MyPostsScreen} />
          <Stack.Screen name="MyPostDetail+" component={MyPostDetail2} />
          <Stack.Screen name="BoardDetail3" component={BoardDetail3Screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
