import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type Props = { size?: number; color?: string };

export default function ClipboardIcon({ size = 24, color = '#9CA3AF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="4" width="14" height="16" rx="2" stroke={color} strokeWidth={2} />
      <Path d="M9 4.5h6a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 4.5Z" stroke={color} strokeWidth={2} />
      <Path d="M8 9h8M8 12h8M8 15h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


