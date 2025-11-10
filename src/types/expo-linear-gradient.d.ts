declare module 'expo-linear-gradient' {
  import * as React from 'react';
  import { ViewProps, StyleProp, ViewStyle } from 'react-native';

  export interface LinearGradientProps extends ViewProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
    style?: StyleProp<ViewStyle>;
  }

  export const LinearGradient: React.ComponentType<LinearGradientProps>;
}


