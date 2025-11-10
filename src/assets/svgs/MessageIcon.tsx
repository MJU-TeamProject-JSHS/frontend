import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type Props = { size?: number; color?: string; opacity?: number };

export default function MessageIcon({ size = 28, color = '#FFFFFF', opacity = 1 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      {/* Rounded chat bubble */} 
      <Rect x="3" y="4" width="18" height="13" rx="5" stroke={color} strokeWidth={2} />
      <Path d="M7 11.5h10M7 9h10" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M7.5 17.5l3-2.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


