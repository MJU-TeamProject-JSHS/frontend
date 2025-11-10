declare module 'react-native-svg' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface SvgProps extends ViewProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    fill?: string;
  }

  const Svg: React.ComponentType<SvgProps>;
  export default Svg;

  export const Path: React.ComponentType<any>;
  export const Circle: React.ComponentType<any>;
  export const Rect: React.ComponentType<any>;
  export const Defs: React.ComponentType<any>;
  export const LinearGradient: React.ComponentType<any>;
  export const Stop: React.ComponentType<any>;
  export const Text: React.ComponentType<any>;
  export const Line: React.ComponentType<any>;
  export const Polyline: React.ComponentType<any>;
  export const Polygon: React.ComponentType<any>;
}


