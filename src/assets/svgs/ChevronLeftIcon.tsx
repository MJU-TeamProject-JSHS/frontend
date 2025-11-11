import React from 'react';
import Svg, { Polyline, Line } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

export default function ChevronLeftIcon({ size = 24, color = '#111827', strokeWidth = 2 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}


