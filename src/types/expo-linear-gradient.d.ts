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
 
declare module 'expo-document-picker' {
  export type DocumentPickerAsset = { name: string; uri: string; mimeType?: string; size?: number };
  export type DocumentPickerResult = { canceled: boolean; assets?: DocumentPickerAsset[] } & any;
  export function getDocumentAsync(options?: {
    type?: string | string[];
    multiple?: boolean;
    copyToCacheDirectory?: boolean;
  }): Promise<DocumentPickerResult>;
}


