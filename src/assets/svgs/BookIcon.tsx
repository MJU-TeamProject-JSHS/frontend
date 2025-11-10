import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; opacity?: number };

export default function BookIcon({ size = 28, color = '#FFFFFF', opacity = 1 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      {/* Open book shape similar to Figma */} 
      <Path d="M4 6.5a2.5 2.5 0 0 1 2.5-2.5H11v15H6.5A2.5 2.5 0 0 1 4 16.5V6.5Z" stroke={color} strokeWidth={2} />
      <Path d="M13 4h4.5A2.5 2.5 0 0 1 20 6.5v10A2.5 2.5 0 0 1 17.5 19H13V4Z" stroke={color} strokeWidth={2} />
      <Path d="M6.5 8H11M13 8h4.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


