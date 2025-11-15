import React from 'react';
import Svg, { Polyline } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

export default function ChevronDownIcon({ size = 24, color = '#6a7282', strokeWidth = 2 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline points="6 9 12 15 18 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

