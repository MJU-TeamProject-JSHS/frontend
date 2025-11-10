import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AiHomeScreen from './src/screen/ai/AiHomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
        <AiHomeScreen />
    </SafeAreaProvider>
  );
}
