import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

type Props = { size?: number; color?: string; opacity?: number };

export default function QuestionIcon({ size = 28, color = '#FFFFFF', opacity = 1 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      {/* Outer rounded square to match Figma icon container shape */} 
      <Rect x="3" y="3" width="18" height="18" rx="6" stroke={color} strokeWidth={2} />
      {/* Question mark tuned to Figma proportions */} 
      <Path d="M9.2 10.2c0-1.6 1.3-2.9 2.9-2.9s2.9 1.3 2.9 2.9c0 .9-.45 1.5-1.22 2.02-.6.41-1.08.86-1.18 1.73v.45" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 17.6h0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


