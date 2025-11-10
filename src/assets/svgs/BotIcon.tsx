import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

type Props = { size?: number; color?: string };

export default function BotIcon({ size = 24, color = '#FFFFFF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth={2} />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx="8.5" cy="15.5" r=".5" fill={color} />
      <Circle cx="15.5" cy="15.5" r=".5" fill={color} />
    </Svg>
  );
}


