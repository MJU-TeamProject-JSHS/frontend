import React from 'react';
import Svg, { Line } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

export default function XIcon({ size = 20, color = '#9CA3AF', strokeWidth = 2 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}


