import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

type Props = { size?: number; color?: string };

export default function ClipboardListMdIcon({ size = 24, color = '#9CA3AF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke={color} strokeWidth={2} />
      <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke={color} strokeWidth={2} />
      <Path d="M12 11h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 16h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M8 11h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M8 16h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


