import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = { size?: number; color?: string; opacity?: number };

export default function CheckIcon({ size = 28, color = '#FFFFFF', opacity = 1 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      <Circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth={2} />
      <Path d="M8.8 12.2l2 2.1 4.4-4.4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}


