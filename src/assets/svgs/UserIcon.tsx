import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = { size?: number; color?: string };

export default function UserIcon({ size = 24, color = '#9CA3AF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} />
      <Path d="M5 20a7 7 0 0 1 14 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


